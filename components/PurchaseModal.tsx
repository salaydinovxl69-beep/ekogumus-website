/* «Земля и Зерно» — purchase modal. Two channels only (Telegram + call);
   Uzum Market was removed per the design handoff. */
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Icon } from "./eko/Icon";
import { Eyebrow } from "./eko/primitives";
import { useFocusTrap } from "./eko/Reveal";
import { useScrollLock } from "../hooks/useScrollLock";

export interface PurchaseItem {
  name?: string;
  weight?: string;
  volume?: string;
  price?: string;
  type?: string;
}

import { PHONE, PHONE_RAW, TELEGRAM_URL } from "../utils/contacts";

interface PurchaseModalProps {
  open: boolean;
  item: PurchaseItem | null;
  onClose: () => void;
}

export function PurchaseModal({ open, item, onClose }: PurchaseModalProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(cardRef, open, onClose);

  useScrollLock(open);

  if (!open) return null;

  const m = t.purchaseModal;
  const e = t.eko;

  const label =
    item && item.name
      ? `${item.name}${item.weight ? ` · ${item.weight} ${t.products.productCards.weightUnit}` : ""}${
          item.volume ? ` · ${item.volume} ${t.products.liquidFertilizers.volumeUnit}` : ""
        }`
      : e.allProducts;

  const telegramHref = item?.name
    ? `${TELEGRAM_URL}?text=${encodeURIComponent(
        `${e.telegramGreeting} ${label}`
      )}`
    : TELEGRAM_URL;

  return (
    <div className="eko-modal eko" onClick={onClose}>
      <div
        className="modal__card"
        ref={cardRef}
        onClick={(ev) => ev.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={m.title}
      >
        <button className="modal__close" aria-label={m.close} onClick={onClose}>
          <Icon name="close" size={22} />
        </button>
        <Eyebrow variant="green">{e.checkout}</Eyebrow>
        <h3 className="modal__title">{m.title}</h3>

        <div className="modal__item">
          <span className="modal__item-ic">
            <Icon name="cart" size={20} />
          </span>
          <div>
            <span className="mono modal__item-k">{e.productLabel}</span>
            <strong>{label}</strong>
          </div>
        </div>

        <a className="modal__method" href={telegramHref} target="_blank" rel="noopener noreferrer">
          <span className="modal__method-ic modal__method-ic--tg">
            <Icon name="telegram" size={22} />
          </span>
          <div className="modal__method-body">
            <strong>{m.telegram.title}</strong>
            <span>{m.telegram.description}</span>
          </div>
          <Icon name="arrow" size={20} className="modal__method-arr" />
        </a>

        <a className="modal__method" href={`tel:${PHONE_RAW}`}>
          <span className="modal__method-ic modal__method-ic--call">
            <Icon name="phone" size={19} />
          </span>
          <div className="modal__method-body">
            <strong>{t.a11y.phoneCall}</strong>
            <span>{PHONE}</span>
          </div>
          <Icon name="arrow" size={20} className="modal__method-arr" />
        </a>
      </div>
    </div>
  );
}
