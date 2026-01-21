import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getCountries, getCurrencies, popularCurrencies } from "@/lib/countries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
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
          
      toast.success(t("waitlist.successTitle"), {
        description: t("waitlist.successMessage"),
      });

      reset();
      onSuccess?.();
    } catch (error: any) {
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
          placeholder="email@example.com"
          className="bg-background"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Date of birth */}
      <div className="space-y-2">
        <Label>{t("waitlist.dateOfBirth")}</Label>
        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>{t("waitlist.selectDate")}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(format(date, "yyyy-MM-dd"));
                      setIsCalendarOpen(false);
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}
        />
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
