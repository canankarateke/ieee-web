const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      committees: "Committees",
      events: "Events",
      contact: "Contact",
      register: "Register",
      products: "Products"
    },
    home_hero: {
      tag: "Advancing Technology for Humanity",
      title: "Welcome to IEEE Fırat Student Branch",
      description: "Join us in shaping the future of technology through innovation, collaboration, and learning",
      viewEvents: "View Events",
      learnMore: "Learn More"
    },
    home_stats: {
      members: "Active Members",
      events: "Annual Events",
      awards: "Awards Won"
    },
    home_committees: {
      tag: "Our Focus Areas",
      title: "Technical Committees",
      description: "Explore our diverse range of technical committees dedicated to advancing knowledge and innovation"
    },
    home_events: {
      tag: "What's Next",
      title: "Upcoming Events",
      description: "Don't miss out on our exciting upcoming events and workshops",
      registerNow: "Register Now"
    },
    footer: {
      tagline: "Advancing Technology for Humanity through innovation, collaboration, and learning.",
      quickLinks: "Quick Links",
      connectWithUs: "Connect With Us",
      followUs: "Follow us on social media to stay updated with our latest events and activities.",
      copyright: "All rights reserved."
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have a question? Reach out and we'll get back to you shortly.",
      name: "Name",
      email: "Email"
    },
    register: {
      title: "Register",
      subtitle: "Join our student branch to stay updated on events and opportunities.",
      fullName: "Full Name",
      studentId: "Student ID",
      register: "Register"
    },
    events: {
      title: "Events",
      subtitle: "Explore our student branch workshops, summits, and seminars."
    },
    product: {
      notFound: "Product not found",
      notFoundDesc: "The product you are looking for is not available.",
      buy: "Buy Now"
    },
    common: {
      siteName: "IEEE Fırat",
      admin: "Administrator"
    },
    admin: {
      title: "Admin Panel",
      subtitle: "Authorized personnel only.",
      loginBtn: "Login",
      usernamePlaceholder: "Enter username",
      passwordPlaceholder: "Enter password"
    }
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      committees: "Komiteler",
      events: "Etkinlikler",
      contact: "İletişim",
      register: "Kayıt Ol",
      products: "Ürünler"
    },
    home_hero: {
      tag: "Advancing Technology for Humanity",
      title: "IEEE Fırat Öğrenci Koluna Hoş Geldiniz",
      description: "İnovasyon, iş birliği ve öğrenim yoluyla teknolojinin geleceğini şekillendirmede bize katılın",
      viewEvents: "Etkinlikleri Gör",
      learnMore: "Daha Fazla Bilgi"
    },
    home_stats: {
      members: "Aktif Üye",
      events: "Yıllık Etkinlik",
      awards: "Kazanılan Ödül"
    },
    home_committees: {
      tag: "Odak Alanlarımız",
      title: "Teknik Komiteler",
      description: "Bilgi ve inovasyonu ilerletmeye adanmış çeşitli teknik komitelerimizi keşfedin"
    },
    home_events: {
      tag: "Sırada Ne Var?",
      title: "Yaklaşan Etkinlikler",
      description: "Heyecan verici yaklaşan etkinliklerimizi ve atölyelerimizi kaçırmayın",
      registerNow: "Şimdi Kaydol"
    },
    footer: {
      tagline: "İnovasyon, iş birliği ve öğrenim yoluyla insanlık için teknolojiyi ilerletiyoruz.",
      quickLinks: "Hızlı Bağlantılar",
      connectWithUs: "Bizimle İletişime Geçin",
      followUs: "En son etkinliklerimiz ve faaliyetlerimizden haberdar olmak için bizi sosyal medyada takip edin.",
      copyright: "Tüm hakları saklıdır."
    },
    contact: {
      title: "Bize Ulaşın",
      subtitle: "Sorunuz mu var? Bize yazın, en kısa sürede sizinle iletişime geçeceğiz.",
      name: "İsim",
      email: "E-posta"
    },
    register: {
      title: "Hesap Oluştur",
      subtitle: "Etkinlik ve fırsatlardan haberdar olmak için öğrenci kolumuza katılın.",
      fullName: "Ad Soyad",
      studentId: "Öğrenci Numarası",
      register: "Kayıt Ol"
    },
    events: {
      title: "Etkinlikler",
      subtitle: "Öğrenci kolumuzun atölyeleri, zirveleri ve seminerleri."
    },
    product: {
      notFound: "Ürün bulunamadı",
      notFoundDesc: "Aradığınız ürün mevcut değil veya kaldırılmış.",
      buy: "Satın Al"
    },
    common: {
      siteName: "IEEE Fırat",
      admin: "Yönetici"
    },
    admin: {
      title: "Yönetici Girişi",
      subtitle: "Sadece yetkili IT ekibi ve YK üyeleri içindir.",
      loginBtn: "Giriş Yap",
      usernamePlaceholder: "Kullanıcı adınızı girin",
      passwordPlaceholder: "Şifrenizi girin"
    }
  }
};

export function getTranslations(locale = "en") {
  return translations[locale] || translations.en;
}

export const SUPPORTED_LOCALES = ["en", "tr"];

export default translations;
