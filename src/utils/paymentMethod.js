import { CreditCard, Landmark } from "lucide-react";

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Kartu Debit / Kredit",
    note: "Visa, Mastercard, dan JCB",
    icon: CreditCard,
  },
  {
    id: "bca",
    label: "BCA Virtual Account",
    note: "Bayar lewat m-banking atau ATM BCA",
    icon: Landmark,
  },
];

// Method apa yang sedang dipakai sebuah order
export const getMethodLabel = (methodId) =>
  PAYMENT_METHODS.find((item) => item.id === methodId)?.label || "Virtual Account";
