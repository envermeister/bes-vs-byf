# ETF vs BES Yatırım Karşılaştırma Hesaplayıcısı

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://versus.enver.cloud)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Türkiye'deki yatırımcılar için ETF (Exchange Traded Fund) ve BES (Bireysel Emeklilik Sistemi) yatırım seçeneklerini karşılaştıran interaktif web uygulaması.

## 🎯 Proje Amacı

Bu uygulama, yatırımcıların kendi kişisel parametrelerini girerek ETF ve BES yatırım seçeneklerini detaylı bir şekilde karşılaştırmasını sağlar. Stopaj, devlet katkısı, yönetim ücretleri ve bileşik faiz etkilerini dikkate alarak hangi yatırım türünün daha avantajlı olduğunu gösterir.

![resim](https://github.com/user-attachments/assets/7338d643-cf65-4f25-af20-dba979e20952)

## ✨ Özellikler

### 📊 Kapsamlı Hesaplama Motoru
- **Bileşik Faiz Hesaplaması**: Aylık katkılar ve getiriler ile detaylı hesaplama
- **Stopaj Etkisi**: ETF yatırımlarında yıllık stopaj kesintilerinin etkisi
- **Devlet Katkısı**: BES'te %30 devlet katkısının uzun vadeli etkisi
- **Yönetim Ücretleri**: Her iki yatırım türü için yönetim ücreti hesaplaması

### 🎨 İnteraktif Kullanıcı Arayüzü
- **Sekmeli Form Yapısı**: Kişisel bilgiler, yatırım seçenekleri, ETF ve BES parametreleri
- **Gerçek Zamanlı Hesaplama**: Parametreler değiştikçe anlık sonuç güncelleme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu modern arayüz
- **Kullanıcı Dostu**: Sezgisel navigasyon ve açıklayıcı bilgi kutuları

### 📈 Görsel Analiz Araçları
- **Karşılaştırma Grafikleri**: ETF vs BES toplam birikim karşılaştırması
- **Yıllık Gelişim**: 31 yıllık süreçte birikimin yıl bazında gelişimi
- **Detay Analiz**: Katkı dağılımı ve maliyet breakdown'u
- **Özet Raporu**: Ana bulgular ve kişiselleştirilmiş öneriler

### 🔧 Kişiselleştirme Seçenekleri
- **Yaş Aralığı**: 18-70 yaş arası esneklik
- **Yatırım Süresi**: Mevcut yaş ve emeklilik yaşına göre otomatik hesaplama
- **Endeks Seçimi**: NASDAQ100 ve S&P500 seçenekleri
- **Getiri Oranları**: Kullanıcı tanımlı getiri oranları

## 🚀 Canlı Demo

**[https://versus.enver.cloud](https://versus.enver.cloud)**

## 🛠️ Teknoloji Stack

### Frontend
- **React 18.3.1** - Modern UI kütüphanesi
- **Vite 6.3.5** - Hızlı build tool ve dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI bileşenleri
- **Recharts** - React için grafik kütüphanesi
- **Lucide React** - Modern icon seti

### Geliştirme Araçları
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- pnpm (önerilen) veya npm

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/yourusername/etf-bes-calculator.git
cd etf-bes-calculator
```

2. **Bağımlılıkları yükleyin**
```bash
pnpm install
# veya
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
pnpm run dev
# veya
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

## 🏗️ Build ve Deploy

### Production Build
```bash
pnpm run build
# veya
npm run build
```

### Preview
```bash
pnpm run preview
# veya
npm run preview
```

Build dosyaları `dist/` klasöründe oluşturulur ve herhangi bir static hosting servisinde deploy edilebilir.

## 📁 Proje Yapısı

```
etf-bes-calculator/
├── public/                 # Static dosyalar
├── src/
│   ├── components/         # React bileşenleri
│   │   ├── ui/            # Shadcn/ui bileşenleri
│   │   ├── ParameterForm.jsx
│   │   └── ResultsDisplay.jsx
│   ├── lib/               # Utility fonksiyonlar
│   │   └── calculations.js # Hesaplama mantığı
│   ├── App.jsx            # Ana uygulama bileşeni
│   ├── App.css            # Global stiller
│   └── main.jsx           # Uygulama giriş noktası
├── index.html             # HTML template
├── package.json           # Proje bağımlılıkları
├── vite.config.js         # Vite konfigürasyonu
├── tailwind.config.js     # Tailwind konfigürasyonu
└── README.md              # Bu dosya
```

## 🧮 Hesaplama Metodolojisi

### ETF Hesaplaması
1. **Aylık Katkı**: Kullanıcı tanımlı başlangıç miktarı + yıllık artış
2. **Aylık Getiri**: (Yıllık getiri - Yönetim ücreti) / 12
3. **Yıllık Stopaj**: Sadece kazanç üzerinden %15 stopaj
4. **Bileşik Faiz**: Aylık katkı ve getiri ile birleşik hesaplama

### BES Hesaplaması
1. **Kişisel Katkı**: Kullanıcı tanımlı aylık ödeme
2. **Devlet Katkısı**: Aylık ödemenin %30'u (ayrı fonda)
3. **Kişisel Fon**: Seçilen endeks getirisi - yönetim ücreti
4. **Devlet Fonu**: Enflasyon oranında (%10) getiri
5. **Stopaj Muafiyeti**: BES'te stopaj kesintisi yok

### Karşılaştırma Kriterleri
- **Toplam Birikim**: 31 yıl sonunda toplam para miktarı
- **Net Kazanç**: Toplam birikim - toplam katkılar
- **Avantaj Oranı**: BES'in ETF'ye göre yüzdelik avantajı
- **Maliyet Analizi**: Stopaj vs devlet katkısı etkisi

## 📊 Varsayılan Parametreler

| Parametre | ETF | BES |
|-----------|-----|-----|
| Yönetim Ücreti | %2 | %2 |
| Stopaj Oranı | %15 | %0 |
| Devlet Katkısı | - | %30 |
| NASDAQ100 Getiri | %15 | %15 |
| S&P500 Getiri | %10 | %10 |
| Devlet Fonu Getiri | - | %10 |

## 🎯 Kullanım Senaryoları

### Senaryo 1: Genç Yatırımcı (25 yaş)
- **Profil**: 25 yaşında, 56 yaşında emekli olmayı planlıyor
- **Yatırım**: Aylık 1.000 TL, yıllık %10 artış
- **Sonuç**: BES genellikle daha avantajlı çıkar

### Senaryo 2: Orta Yaş Yatırımcı (40 yaş)
- **Profil**: 40 yaşında, 60 yaşında emekli olmayı planlıyor
- **Yatırım**: Aylık 2.000 TL, yıllık %5 artış
- **Sonuç**: Devlet katkısının etkisi daha belirgin

### Senaryo 3: Yüksek Getiri Beklentisi
- **Profil**: NASDAQ100'e odaklı yatırımcı
- **Beklenti**: %15+ yıllık getiri
- **Sonuç**: BES'in avantajı maksimum seviyede

## ⚠️ Önemli Uyarılar

- Bu uygulama **bilgilendirme amaçlıdır** ve yatırım tavsiyesi niteliği taşımaz
- Gerçek yatırım kararları alırken **profesyonel finansal danışmanlık** alınması önerilir
- **Geçmiş performans** gelecekteki sonuçları garanti etmez
- **Vergi mevzuatı** ve devlet katkı oranları değişebilir
- Hesaplamalar **2025 yılı** yasal düzenlemeleri baz alınarak yapılmıştır

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız veya önerileriniz için:
- 🐛 **Bug Report**: GitHub Issues kullanın
- 💡 **Feature Request**: GitHub Issues kullanın
- 📧 **Genel Sorular**: GitHub Discussions kullanın

## 🙏 Teşekkürler

- **React Team** - Harika framework için
- **Tailwind CSS** - Utility-first CSS yaklaşımı için
- **Recharts** - Güzel grafikler için
- **Shadcn** - Modern UI bileşenleri için

---

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

