import { useTranslation } from "react-i18next";

export const OurServices = () => {
  const { t, i18n } = useTranslation();
  // <h2 className={`font- text-[23px] gap-2`}>{t("ourServices")}</h2>
  return (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[13rem]">
      <div className="relative z-[2] my-4">
        <div className="bg-[#ee1d24] text-white py-12 text-center rounded-lg">
          <h1 className="text-4xl font-bold">تطبيق البضاعة</h1>
          <p className="mt-2 text-xl">
            منصة شاملة لمواد البناء والتشطيبات ومستلزمات المصانع والشركات
          </p>
        </div>
        <section
          id="about"
          className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
        >
          <h2 className="text-2xl font-semibold text-[#ee1d24]">
            عن "البضاعة"
          </h2>
          <p className="mt-4 text-lg">
            <strong>البضاعة</strong> هو تطبيق رائد في قطاع مواد البناء
            والتشطيبات، يهدف إلى تسهيل عمليات البيع والشراء بين التجار،
            الموردين، والمستهلكين. من خلال توفير حلول متكاملة تلبي احتياجات
            المصانع، الشركات، والمستهلكين على حد سواء. يعد "البضاعة" الخيار
            الأمثل لمن يبحث عن خدمات أو مستلزمات تتعلق بالبناء والتشطيبات، بفضل
            الأدوات المتقدمة التي يوفرها للمستخدمين.
          </p>
        </section>
        <section
          id="features"
          className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
        >
          <h2 className="text-2xl font-semibold text-[#ee1d24]">
            مميزات تطبيق البضاعة
          </h2>
          <ul className="mt-4 space-y-4 text-lg">
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">منصة شاملة:</span>
              توفر تشكيلة واسعة من المواد المستخدمة في مشاريع البناء والتشطيبات،
              بما في ذلك مستلزمات المصانع والشركات.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">
                سهولة استعراض المنتجات:
              </span>
              يتيح للعملاء الاطلاع على مجموعة متنوعة من المنتجات بجميع
              التصنيفات.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">
                أدوات بحث متقدمة:
              </span>
              إمكانية البحث والتصفية حسب الفئة، المورد، أو الموقع الجغرافي،
              لتوفير الوقت والجهد.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">
                معلومات تفصيلية:
              </span>
              عرض مواصفات المنتجات الفنية والأسعار بشكل دقيق وشفاف.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">
                التواصل المباشر:
              </span>
              تسهيل التواصل بين التجار، الموردين، المهندسين، والمقاولين،
              والمستهلكين، لعرض الطلبات أو الإجابة على الاستفسارات.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#ee1d24] font-bold">
                تبسيط الطلبات:
              </span>
              إمكانية الطلب المباشر من التجار أو الموردين عبر التطبيق.
            </li>
          </ul>
        </section>
        <section
          id="who"
          className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
        >
          <h2 className="text-2xl font-semibold text-[#ee1d24]">
            من يناسب تطبيق البضاعة؟
          </h2>
          <div className="mt-4 space-y-4 text-lg">
            <p>
              <span className="font-bold text-[#ee1d24]">
                الشركات والمصانع:
              </span>{" "}
              لعرض وتسويق منتجاتهم بسهولة وفعالية.
            </p>
            <p>
              <span className="font-bold text-[#ee1d24]">
                المهندسين والمقاولين:
              </span>{" "}
              للحصول على مواد البناء المناسبة بسرعة وبأسعار تنافسية، مما يساهم
              في إنجاح مشاريعهم.
            </p>
            <p>
              <span className="font-bold text-[#ee1d24]">
                التجار والموردين:
              </span>{" "}
              لتعزيز حضورهم في السوق والتواصل مع العملاء بشكل مباشر وفعال، مما
              يعزز من فرص النجاح.
            </p>
          </div>
        </section>
        <section
          id="goal"
          className="mx-auto p-6 bg-white shadow-md rounded-lg my-10"
        >
          <h2 className="text-2xl font-semibold text-[#ee1d24]">هدفنا</h2>
          <p className="mt-4 text-lg">
            يهدف تطبيق "البضاعة" إلى تمكين جميع الأطراف العاملة في قطاع البناء
            والتشطيبات من الوصول إلى احتياجاتهم بسهولة وفعالية. يعزز التطبيق
            كفاءة العمليات التجارية ويساهم في تحقيق النجاح لمشاريعهم من خلال
            توفير الأدوات والموارد اللازمة لأداء مهامهم بشكل أفضل.
          </p>
        </section>
      </div>
    </main>
  );
};
