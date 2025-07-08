import { useState } from 'react';
import { ParameterForm } from './components/ParameterForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { compareInvestments } from './lib/calculations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, PiggyBank, Info } from 'lucide-react';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (params) => {
    setIsCalculating(true);
    setParameters(params);
    
    // Kısa bir gecikme ekleyerek hesaplama sürecini simüle et
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // ETF parametreleri
      const etfParams = {
        initialMonthlyPayment: params.initialMonthlyPayment,
        annualReturnRate: params.annualReturnRate,
        managementFeeRate: params.managementFeeRate,
        withholdingTaxRate: params.withholdingTaxRate,
        years: params.years,
        annualIncreaseRate: params.annualIncreaseRate
      };

      // BES parametreleri
      const besParams = {
        initialMonthlyPayment: params.initialMonthlyPayment,
        annualReturnRate: params.annualReturnRate,
        managementFeeRate: params.managementFeeRate,
        governmentContributionRate: params.governmentContributionRate,
        governmentFundReturnRate: params.governmentFundReturnRate,
        years: params.years,
        annualIncreaseRate: params.annualIncreaseRate
      };

      const comparisonResults = compareInvestments(etfParams, besParams);
      setResults(comparisonResults);
    } catch (error) {
      console.error('Hesaplama hatası:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ETF vs BES Yatırım Karşılaştırma Hesaplayıcısı
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kişisel parametrelerinizi girerek ETF ve Bireysel Emeklilik Sistemi (BES) 
            yatırım seçeneklerini karşılaştırın ve size en uygun yatırım stratejisini belirleyin.
          </p>
        </div>

        {/* Bilgi Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Calculator className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Detaylı Hesaplama</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Bileşik faiz, stopaj, devlet katkısı ve yönetim ücretlerini 
                dikkate alan kapsamlı hesaplama motoru
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Görsel Analiz</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Yıllık gelişim grafikleri, karşılaştırma tabloları ve 
                detaylı analiz raporları ile sonuçlarınızı görselleştirin
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <PiggyBank className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Kişiselleştirilmiş</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Yaşınız, gelir durumunuz ve risk profilinize uygun 
                özelleştirilmiş yatırım önerileri alın
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Ana İçerik */}
        <div className="space-y-8">
          {/* Parametre Formu */}
          <ParameterForm onCalculate={handleCalculate} isCalculating={isCalculating} />

          {/* Sonuçlar */}
          {results && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <ResultsDisplay results={results} parameters={parameters} />
            </div>
          )}
        </div>

        {/* Footer Bilgi */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Önemli Uyarılar:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Bu hesaplama aracı bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz.</li>
                <li>Gerçek yatırım kararları alırken profesyonel finansal danışmanlık alınması önerilir.</li>
                <li>Geçmiş performans gelecekteki sonuçları garanti etmez.</li>
                <li>Vergi mevzuatı ve devlet katkı oranları değişebilir.</li>
                <li>Hesaplamalar mevcut yasal düzenlemeler baz alınarak yapılmıştır (2025).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 ETF vs BES Hesaplayıcısı - Finansal Planlama Aracı</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

