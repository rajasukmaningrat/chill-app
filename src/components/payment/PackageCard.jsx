import { Check } from "lucide-react";

import { formatRupiah } from "../../utils/format";

function PackageCard({ item, selected = false, onSelect }) {
  const features = item.features || [];

  return (
    <article className={`package-card${selected ? " is-selected" : ""}`}>
      <h3 className="package-name">{item.name}</h3>

      <p className="package-price">
        {formatRupiah(item.price)}
        <span className="package-period">/bulan</span>
      </p>

      <p className="package-accounts">
        {item.accounts} akun yang bisa dipakai
      </p>

      <ul className="package-features">
        {features.map((feature) => (
          <li key={feature}>
            <Check size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {onSelect && (
        <button
          className={selected ? "btn-info is-selected" : "btn-info"}
          onClick={() => onSelect(item)}
        >
          {selected ? "Paket Dipilih" : "Langganan"}
        </button>
      )}
    </article>
  );
}

export default PackageCard;
