import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FooterTranslationsType } from "../footer.types";
import { footerConstants } from "../footer.constants";

export const FooterContactus = () => {
  const { t } = useTranslation();
  const footer = t("footer") as unknown as FooterTranslationsType;

  return (
    <>
      <div>
        <h3 className="text-md font-bold mb-6 whitespace-nowrap">
          {footer.numberstitle}
        </h3>
        <ul>
          <li className="flex justify-start items-center gap-2 text-sm mb-3">
            <PhoneCall /> {footerConstants.phone}
          </li>
          <li className="flex justify-start items-center gap-2 text-sm mb-3">
            <PhoneCall /> {footerConstants.companyPhone}
          </li>
          <li className="flex justify-start items-center gap-2 text-sm mb-3">
            <Mail />
            {footerConstants.email}
          </li>
          <a
            className="flex justify-start items-center gap-2 text-sm mb-3"
            href={footerConstants.googleMapLocation}
            target="_blank"
          >
            <MapPin /> القاهره - مول وسط العاصمه
          </a>
        </ul>
      </div>
    </>
  );
};
