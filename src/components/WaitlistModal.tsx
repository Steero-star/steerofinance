import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./WaitlistForm";
import { useEffect } from "react";
import { trackWaitlistOpen, trackWaitlistStep } from "@/lib/analytics";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      trackWaitlistOpen("modal");
      trackWaitlistStep("form_seen");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("waitlist.modalTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("waitlist.modalDescription")}
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
