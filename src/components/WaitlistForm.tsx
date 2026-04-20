import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCountries, getCurrencies, popularCurrencies } from "@/lib/countries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  trackWaitlistStep,
  trackWaitlistSubmit,
  dispatchWaitlistConversion,
} from "@/lib/analytics";


interface WaitlistFormProps {
  onSuccess?: () => void;
}

// Returns the number of days in a given month/year (handles leap years).
// When no year is provided yet, defaults to a non-leap year so February
// shows 28 days — the 29th only appears once a valid leap year is selected.
const getDaysInMonth = (month: string, year: string): number => {
  if (!month) return 31;
  const m = parseInt(month);
  const y = year ? parseInt(year) : 2001; // 2001 = non-leap year as safe default
  return new Date(y, m, 0).getDate();
};

const MONTHS = [
  { value: 1, label: "janvier" },
  { value: 2, label: "février" },
  { value: 3, label: "mars" },
  { value: 4, label: "avril" },
  { value: 5, label: "mai" },
  { value: 6, label: "juin" },
  { value: 7, label: "juillet" },
  { value: 8, label: "août" },
  { value: 9, label: "septembre" },
  { value: 10, label: "octobre" },
  { value: 11, label: "novembre" },
  { value: 12, label: "décembre" },
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 }, (_, i) => currentYear - i);

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local state for the three date parts
  const [dobDay, setDobDay] = useState<string>("");
  const [dobMonth, setDobMonth] = useState<string>("");
  const [dobYear, setDobYear] = useState<string>("");

  const defaultLanguage = (
    ["fr", "en", "es"].includes(i18n.language) ? i18n.language : "en"
  ) as "fr" | "en" | "es";

  const schema = z.object({
    first_name: z
      .string()
      .min(1, t("waitlist.errors.required")),
    last_name: z
      .string()
      .min(1, t("waitlist.errors.required")),
    email: z
      .string()
      .min(1, t("waitlist.errors.required"))
      .email(t("waitlist.errors.email")),
    date_of_birth: z
      .string()
      .min(1, t("waitlist.errors.required")),
    country: z
      .string()
      .min(1, t("waitlist.errors.required")),
    language: z.enum(["fr", "en", "es"]),
    currency: z
      .string()
      .min(1, t("waitlist.errors.required")),
    terms_accepted: z.boolean().refine((val) => val === true, {
      message: t("waitlist.errors.terms"),
    }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      language: defaultLanguage,
      terms_accepted: false,
    },
  });

  const countries = getCountries();
  const currencies = getCurrencies();
  const termsAccepted = watch("terms_accepted");

  const datePlaceholders = {
    day:   { fr: "Jour",  en: "Day",   es: "Día"  },
    month: { fr: "Mois",  en: "Month", es: "Mes"  },
    year:  { fr: "Année", en: "Year",  es: "Año"  },
  } as const;
  const dp = datePlaceholders;
  const lang = defaultLanguage;

  // Update the hidden date_of_birth field whenever a part changes
  const handleDatePartChange = (
    day: string,
    month: string,
    year: string,
    setDay?: (v: string) => void
  ) => {
    // If the selected day exceeds the days available in the new month/year, reset it
    if (day && month) {
      const maxDays = getDaysInMonth(month, year);
      if (parseInt(day) > maxDays) {
        day = "";
        setDay?.("");
      }
    }

    if (day && month && year) {
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      setValue("date_of_birth", `${year}-${mm}-${dd}`, { shouldValidate: true });
    } else {
      setValue("date_of_birth", "", { shouldValidate: false });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    trackWaitlistStep("form_submitted");
    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          date_of_birth: data.date_of_birth,
          country: data.country,
          language: data.language,
          currency: data.currency,
          terms_accepted: data.terms_accepted,
        },
      ]);

      if (error?.message?.includes("waitlist_email_key")) {
        trackWaitlistStep("email_duplicate");
        toast.error(
          t("waitlist.errors.emailExists") || "Email already registered",
          {
            style: { color: "black" },
            descriptionClassName: "text-black",
          }
        );
        setIsSubmitting(false);
        return;
      }

      trackWaitlistStep("form_success");
      dispatchWaitlistConversion();
      toast.success(t("waitlist.successTitle"), {
        description: t("waitlist.successMessage"),
      });

      reset();
      setDobDay("");
      setDobMonth("");
      setDobYear("");
      onSuccess?.();
    } catch (error: any) {
      trackWaitlistStep("form_error", { reason: error.message });
      toast.error("Error", {
        description: error.message || "An error occurred while submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First name & Last name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">{t("waitlist.firstName")}</Label>
          <Input
            id="first_name"
            {...register("first_name")}
            placeholder={t("waitlist.firstName")}
            className="bg-background"
          />
          {errors.first_name && (
            <p className="text-sm text-destructive">{errors.first_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">{t("waitlist.lastName")}</Label>
          <Input
            id="last_name"
            {...register("last_name")}
            placeholder={t("waitlist.lastName")}
            className="bg-background"
          />
          {errors.last_name && (
            <p className="text-sm text-destructive">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("waitlist.email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          onFocus={() => trackWaitlistStep("form_focused")}
          placeholder="email@example.com"
          className="bg-background"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Date of birth — hidden field + three selects */}
      <div className="space-y-2">
        <Label>{t("waitlist.dateOfBirth")}</Label>

        {/* Hidden field managed by react-hook-form */}
        <input type="hidden" {...register("date_of_birth")} />

        <div className="grid grid-cols-3 gap-2">
          {/* Day */}
          <Select
            value={dobDay}
            onValueChange={(val) => {
              setDobDay(val);
              handleDatePartChange(val, dobMonth, dobYear);
            }}
          >
            <SelectTrigger className="bg-background">
            <SelectValue placeholder={dp.day[lang]} />
            </SelectTrigger>
            <SelectContent className="z-50 max-h-[200px]">
              {Array.from(
                { length: getDaysInMonth(dobMonth, dobYear) },
                (_, i) => i + 1
              ).map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month */}
          <Select
            value={dobMonth}
            onValueChange={(val) => {
              setDobMonth(val);
              handleDatePartChange(dobDay, val, dobYear, setDobDay);
            }}
          >
            <SelectTrigger className="bg-background">
            <SelectValue placeholder={dp.month[lang]} />
            </SelectTrigger>
            <SelectContent className="z-50 max-h-[200px]">
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Select
            value={dobYear}
            onValueChange={(val) => {
              setDobYear(val);
              handleDatePartChange(dobDay, dobMonth, val, setDobDay);
            }}
          >
            <SelectTrigger className="bg-background">
            <SelectValue placeholder={dp.year[lang]} />
            </SelectTrigger>
            <SelectContent className="z-50 max-h-[200px]">
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {errors.date_of_birth && (
          <p className="text-sm text-destructive">{errors.date_of_birth.message}</p>
        )}
      </div>

      {/* Country & Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("waitlist.country")}</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("waitlist.selectCountry")} />
                </SelectTrigger>
                <SelectContent className="z-50 max-h-[300px]">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("waitlist.language")}</Label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("waitlist.selectLanguage")} />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.language && (
            <p className="text-sm text-destructive">{errors.language.message}</p>
          )}
        </div>
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <Label>{t("waitlist.currency")}</Label>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder={t("waitlist.selectCurrency")} />
              </SelectTrigger>
              <SelectContent className="z-50 max-h-[300px]">
                <SelectGroup>
                  <SelectLabel>{t("waitlist.popularCurrencies")}</SelectLabel>
                  {currencies
                    .filter((c) => popularCurrencies.includes(c.code))
                    .map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{t("waitlist.allCurrencies")}</SelectLabel>
                  {currencies
                    .filter((c) => !popularCurrencies.includes(c.code))
                    .map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.currency && (
          <p className="text-sm text-destructive">{errors.currency.message}</p>
        )}
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Controller
            name="terms_accepted"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            )}
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
            {t("waitlist.termsText")}{" "}
            <Link to="/cgs" className="text-primary underline hover:no-underline" target="_blank">
              {t("waitlist.termsLink")}
            </Link>
          </Label>
        </div>
        {errors.terms_accepted && (
          <p className="text-sm text-destructive">{errors.terms_accepted.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full btn-primary"
        disabled={isSubmitting || !termsAccepted}
      >
        {isSubmitting ? t("waitlist.submitting") : t("waitlist.submit")}
      </Button>
    </form>
  );
}