import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import {
  Add,
  Add2,
  Add3,
  Conditioner1,
  Conditioner2,
  FireExtinguisher,
  Grear,
  Screws,
} from "./assets";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    lng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          theresNoAds: "There's no ads",
          viewMore: "View More",
          login: "Login",
          sale: "Sale",
          languages: "Arabic",
          search: "What are you looking for?",
          navigation: [
            {
              route: "/home/categories/my-ads",
              children: "More",
            },
            {
              route: "/home/categories/",
              children: "Fire Fighting",
            },
            {
              route: "/home/categories/categories",
              children: "Central Air Conditioning",
            },
            {
              route: "/home/categories/my-ads",
              children: "Real Estate",
            },
            {
              route: "/home/categories/my-ads",
              children: "Construction Materials",
            },
            {
              route: "/home/categories/my-ads",
              children: "Electricity",
            },
            {
              route: "/home/categories/my-ads",
              children: "Metals",
            },
            {
              route: "/home/categories/my-ads",
              children: "Security Systems",
            },
          ],
          categoriesTitle: "Categories",
          specialOffers: "Special Offers",
          filters: [
            {
              id: 1,
              category: "special",
              name: "special",
            },
            {
              id: 2,
              category: "lowPrice",
              name: "lowPrice",
            },
            {
              id: 3,
              category: "highPrice",
              name: "highPrice",
            },
          ],
          categoriesname: "Electronics",
          filter: "Filter",
          sortby: "Sort by :",
          product: {
            addtofav: "Add to Favorites",
            check: "Verified",
            special: "Special",
            location: "Cairo - Sahel Hamza",
            date: "Five days",
            calltrader: "Call the Trader",
            price: "850 EGP",
            productname: "Organic Face Wash",
            share: "Share",
            name: "wildduck",
            joined: "Member for 2 years",
            hazard: "Your safety matters!",
            hazards: [
              "- Only meet in public/crowded places, e.g., metro stations and malls.",
              "- Never go alone to meet the buyer/seller; always take someone with you.",
              "- Inspect the product and check it thoroughly before buying it.",
              "- Never pay anything in advance or transfer money before inspecting the product.",
            ],

            productinfo: [
              { label: "Brand", value: "Nivea" },
              { label: "Product Type", value: "Moisturizing Cream" },
              { label: "Skin Type", value: "All Skin Types" },
              { label: "Weight", value: "200 ml" },
              { label: "Ingredients", value: "Natural Oils, Vitamin E" },
              { label: "Usage Time", value: "Day and Night" },
              { label: "Benefits", value: "Deep Hydration" },
            ],
            locationtitle: "Location",
            productdetails: "Details",
            productdescription: "Description",
            description: [
              "This luxurious cream contains a unique blend of avocado oils and Vitamin E to deeply moisturize the skin, leaving it soft and supple all day long.",
              "Formulated for sensitive skin, it's free from harmful chemicals like parabens and sulfates, making it gentle and non-irritating.",
              "Its light, non-greasy texture quickly absorbs into the skin, making it ideal for morning or evening use without leaving any sticky residue.",
              "Clinically proven to improve skin hydration by up to 45% after just two weeks of regular use.",
              "Contains anti-aging ingredients such as hyaluronic acid to improve the appearance of fine lines and wrinkles.",
            ],
          },
          settings: {
            sectiontitle: "Settings",
            subsectiontitle:
              "Manage your account, make your add special, customer support, my favorites, my ads, and more.",
            header: [
              {
                title: "account",
                children: "account",
              },
              {
                title: "customer support",
                children: "customer support",
              },
              {
                title: "my favorites",
                children: "my favorites",
              },
              {
                title: "my ads",
                children: "my ads",
              },
              {
                title: "verify your account",
                children: "verify your account",
              },
            ],
          },
          account: {
            name: "Name",
            company: "Company Name",
            email: "Email",
            phone: "Phone",
            oldpassword: "Old Password",
            newpassword: "New Password",
            confirmnewpassword: "Confirm New Password",
            save: "Submit",
          },
          signup: {
            register: "Register",
            trader: "Trader",
            customer: "Customer",
            username: "Username",
            companyname: "Company Name",
            opt: "optional",
            subtitle: "Fill the form below to create your account",
            email: "Email",
            password: "Password",
            forgotpassword: "Forgot your password?",
            signin: "Signin",
            createaccount: "Create Account",
            agree: "By clicking continue, you agree to the",
            link: "Terms and Conditions",
          },
          forgetpassword: {
            signin: "Signin",
            title: "Forgot Password",
            phonenumber: "Phone Number",
            subtitle:
              "Enter your phone number and we'll send you a link to reset your password.",
            forgetpassword: "Forget Password",
            agree: "By clicking continue, you agree to the",
            link: "Terms and Conditions",
          },
          signin: {
            register: "Register",
            title: "Welcome Back",
            subtitle: "Sign in to continue",
            email: "Email",
            password: "Password",
            forgotpassword: "Forgot your password?",
            signin: "Signin",
            createaccount: "Create Account",
            agree: "By clicking continue, you agree to the",
            link: "Terms and Conditions",
          },
          footer: {
            title: "Find amazing deals with us.",
            subtitle: "Connect with us via",
            numberstitle: "Contact us",
            followustitle: "Follow us:",

            copyright: "© 2022. All rights reserved.",
          },
        },
      },
      ar: {
        translation: {
          theresNoAds: "لا يوجد اعلانات",
          login: "تسجيل الدخول",
          sale: "بيع",
          languages: "الانجليزية",
          search: "بتدور على ايه",
          navigation: [
            {
              title: "المزيد",
              route: "/home/categories/my-ads",
              children: "المزيد",
            },
            {
              title: "مكافحة الحريق",
              route: "/home/categories/",
              children: "مكافحة الحريق",
            },
            {
              title: "التكييف المركزي",
              route: "/home/categories/categories",
              children: "التكييف المركزي",
            },

            {
              title: "عقارات",
              route: "/home/categories/my-ads",
              children: "عقارات",
            },
            {
              title: "موارد البناء",
              route: "/home/categories/my-ads",
              children: "موارد البناء",
            },
            {
              title: "الكهرباء",
              route: "/home/categories/my-ads",
              children: "الكهرباء",
            },
            {
              title: "معادن",
              route: "/home/categories/my-ads",
              children: "معادن",
            },
            {
              title: "انظمه امنيه",
              route: "/home/categories/my-ads",
              children: "انظمه امنيه",
            },
          ],
          categoriesTitle: "الفئات",
          specialOffers: "المنتجات المميزة",

          filters: [
            {
              id: 1,
              category: "special",
              name: "مميزة",
            },
            {
              id: 2,
              category: "lowPrice",
              name: "الاقل سعرا",
            },
            {
              id: 3,
              category: "highPrice",
              name: "الاعلى سعرا",
            },
          ],
          categoriesname: "تكنولوجيا المعلومات",
          filter: "فلتر",
          sortby: "صنف المنتج :",
          product: {
            addtofav: "اضف للمفضلة",
            check: "موثق",
            special: "مميز",
            location: "القاهره - سهل حمزه",
            price: "850 ج.م",
            productname: "مقشر القهوة أورجانيك كير",
            date: "خمسه ايام",
            calltrader: "الاتصال بالتاجر",
            share: "مشاركة",
            name: "wildduck",
            joined: "عضو منذ 2 سنوات",
            hazard: "سلامتك تهمنا!",
            hazards: [
              "- الالتقاء فقط في الأماكن العامة/المزدحمة، على سبيل المثال محطات المترو ومراكز التسوق.",
              "- لا تذهب أبدًا بمفردك لمقابلة المشتري / البائع، اصطحب دائمًا شخصًا معك.",
              "- قم بفحص المنتج وفحصه بشكل صحيح قبل شرائه.",
              "- لا تدفع أبدًا أي شيء مقدمًا أو تحول الأموال قبل فحص المنتج.",
            ],

            productinfo: [
              { label: "العلامة التجارية", value: "نيفيا" },
              { label: "نوع المنتج", value: "كريم مرطب" },
              { label: "نوع البشرة", value: "جميع أنواع البشرة" },
              { label: "الوزن", value: "200 مل" },
              { label: "المكونات", value: "زيوت طبيعية، فيتامين E" },
              { label: "فترة الاستخدام", value: "نهاري ومسائي" },
              { label: "فوائد", value: "ترطيب عميق" },
            ],
            locationtitle: "الموقع",
            productdetails: "التفاصيل",
            productdescription: "الوصف",
            description: [
              "هذا الكريم الفاخر يحتوي على مزيج فريد من زيوت الأفوكادو وفيتامين E لترطيب البشرة بعمق وجعلها ناعمة ومرنة طوال اليوم.",
              "مصمم للبشرة الحساسة، خالٍ من المواد الكيميائية الضارة مثل البارابين والكبريتات، ما يجعله لطيفًا على البشرة ولا يسبب التهيج.",
              "قوامه خفيف وغير دهني، يمتص بسرعة في البشرة، مما يجعله مثاليًا للاستخدام صباحًا أو مساءً دون ترك أي بقايا لزجة.",
              "ثبت سريريًا أنه يحسن ترطيب البشرة بنسبة تصل إلى 45% بعد أسبوعين فقط من الاستخدام المنتظم.",
              "يحتوي على مكونات مضادة للشيخوخة مثل حمض الهيالورونيك لتحسين مظهر الخطوط الدقيقة والتجاعيد.",
            ],
          },

          settings: {
            sectiontitle: "الإعدادات",
            subsectiontitle:
              "إدارة حسابك، تمييز إعلاناتك، الدعم الفني، المفضلات، إعلاناتي، والمزيد.",
            header: [
              {
                title: "account",
                children: "الحساب",
              },

              {
                title: "customer support",
                children: "دعم العملاء",
              },
              {
                title: "my favorites",
                children: "المفضلات",
              },
              {
                title: "my ads",
                children: "إعلاناتي",
              },
              {
                title: "verify your account",
                children: "تحقق من حسابك",
              },
            ],
          },
          account: {
            name: "الاسم",
            company: "اسم الشركة",
            email: "البريد الإلكتروني",
            phone: "الهاتف",
            oldpassword: "كلمة المرور القديمة",
            newpassword: "كلمة المرور الجديدة",
            confirmnewpassword: "تأكيد كلمة المرور الجديدة",
            save: "إرسال",
          },
          signup: {
            register: "تسجيل",
            trader: "تاجر",
            customer: "عميل",
            username: "اسم المستخدم",
            companyname: "اسم الشركة",
            opt: "اختياري",
            subtitle: "املأ النموذج أدناه لإنشاء حسابك",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            forgotpassword: "نسيت كلمة المرور؟",
            signin: "تسجيل الدخول",
            createaccount: "إنشاء حساب",
            agree: "بالنقر على متابعة، فإنك توافق على",
            link: "الشروط والأحكام",
          },
          forgetpassword: {
            signin: "تسجيل الدخول",
            title: "نسيت كلمة المرور",
            phonenumber: "رقم الهاتف",
            subtitle:
              "أدخل رقم هاتفك وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
            forgetpassword: "إعادة تعيين كلمة المرور",
            agree: "بالنقر على متابعة، فإنك توافق على",
            link: "الشروط والأحكام",
          },
          signin: {
            register: "انشاء حساب",
            title: "مرحبًا بعودتك",
            subtitle: "قم بتسجيل الدخول للمتابعة",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            forgotpassword: "نسيت كلمة المرور؟",
            signin: "تسجيل الدخول",
            createaccount: "انشاء حساب",
            agree: "بالنقر على متابعة، فإنك توافق على",
            link: "الشروط والاحكام",
          },
          footer: {
            title: "اعثر على صفقات مذهلة لدينا.",
            subtitle: "تواصل معنا عبر",
            numberstitle: "تواصل معنا",
            followustitle: "تابعنا :",
            copyright: "جميع الحقوق محفوظه لدي البضاعه @ 2024",
          },

          viewMore: "اظهار المزيد",
        },
      },
    },
  });
