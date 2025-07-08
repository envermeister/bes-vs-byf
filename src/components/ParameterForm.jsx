import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Info, TrendingUp, PiggyBank } from 'lucide-react';
import { getDefaultParameters } from '@/lib/calculations';

export function ParameterForm({ onCalculate, isCalculating }) {
  const defaults = getDefaultParameters();
  
  const [parameters, setParameters] = useState({
    // Kişisel bilgiler
    currentAge: 25,
    retirementAge: 56,
    initialMonthlyPayment: defaults.initialMonthlyPayment,
    annualIncreaseRate: defaults.annualIncreaseRate * 100, // Yüzde olarak göster
    
    // Yatırım seçenekleri
    selectedIndex: 'nasdaq', // nasdaq veya sp500
    
    // ETF parametreleri
    managementFeeRate: defaults.managementFeeRate * 100,
    withholdingTaxRate: defaults.withholdingTaxRate * 100,
    
    // BES parametreleri
    governmentContributionRate: defaults.governmentContributionRate * 100,
    governmentFundReturnRate: defaults.governmentFundReturnRate * 100,
    
    // Endeks getirileri
    nasdaqReturnRate: defaults.nasdaqReturnRate * 100,
    sp500ReturnRate: defaults.sp500ReturnRate * 100
  });

  const handleInputChange = (field, value) => {
    setParameters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parametreleri hesaplama fonksiyonu için uygun formata çevir
    const calculationParams = {
      initialMonthlyPayment: Number(parameters.initialMonthlyPayment),
      years: parameters.retirementAge - parameters.currentAge,
      annualIncreaseRate: Number(parameters.annualIncreaseRate) / 100,
      managementFeeRate: Number(parameters.managementFeeRate) / 100,
      withholdingTaxRate: Number(parameters.withholdingTaxRate) / 100,
      governmentContributionRate: Number(parameters.governmentContributionRate) / 100,
      governmentFundReturnRate: Number(parameters.governmentFundReturnRate) / 100,
      annualReturnRate: parameters.selectedIndex === 'nasdaq' 
        ? Number(parameters.nasdaqReturnRate) / 100 
        : Number(parameters.sp500ReturnRate) / 100,
      selectedIndex: parameters.selectedIndex
    };

    onCalculate(calculationParams);
  };

  const resetToDefaults = () => {
    setParameters({
      currentAge: 25,
      retirementAge: 56,
      initialMonthlyPayment: defaults.initialMonthlyPayment,
      annualIncreaseRate: defaults.annualIncreaseRate * 100,
      selectedIndex: 'nasdaq',
      managementFeeRate: defaults.managementFeeRate * 100,
      withholdingTaxRate: defaults.withholdingTaxRate * 100,
      governmentContributionRate: defaults.governmentContributionRate * 100,
      governmentFundReturnRate: defaults.governmentFundReturnRate * 100,
      nasdaqReturnRate: defaults.nasdaqReturnRate * 100,
      sp500ReturnRate: defaults.sp500ReturnRate * 100
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          ETF vs BES Yatırım Hesaplayıcısı
        </CardTitle>
        <CardDescription>
          Kişisel parametrelerinizi girerek ETF ve BES yatırım seçeneklerini karşılaştırın
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Kişisel Bilgiler</TabsTrigger>
              <TabsTrigger value="investment">Yatırım Seçenekleri</TabsTrigger>
              <TabsTrigger value="etf">ETF Parametreleri</TabsTrigger>
              <TabsTrigger value="bes">BES Parametreleri</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Mevcut Yaşınız</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    min="18"
                    max="65"
                    value={parameters.currentAge}
                    onChange={(e) => handleInputChange('currentAge', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Emeklilik Yaşı</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    min={parameters.currentAge}
                    max="70"
                    value={parameters.retirementAge}
                    onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialMonthlyPayment">Başlangıç Aylık Ödeme (TL)</Label>
                  <Input
                    id="initialMonthlyPayment"
                    type="number"
                    min="100"
                    step="50"
                    value={parameters.initialMonthlyPayment}
                    onChange={(e) => handleInputChange('initialMonthlyPayment', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncreaseRate">Yıllık Artış Oranı (%)</Label>
                  <Input
                    id="annualIncreaseRate"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={parameters.annualIncreaseRate}
                    onChange={(e) => handleInputChange('annualIncreaseRate', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Bilgi:</p>
                    <p>Yatırım süreniz: <strong>{parameters.retirementAge - parameters.currentAge} yıl</strong></p>
                    <p>Toplam kişisel katkınız yaklaşık: <strong>{Math.round(parameters.initialMonthlyPayment * 12 * (parameters.retirementAge - parameters.currentAge) * (1 + parameters.annualIncreaseRate / 100) / 2).toLocaleString('tr-TR')} TL</strong></p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="investment" className="space-y-4">
              <div className="space-y-4">
                <Label>Yatırım Yapılacak Endeks</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-colors ${parameters.selectedIndex === 'nasdaq' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleInputChange('selectedIndex', 'nasdaq')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">NASDAQ100</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Teknoloji ağırlıklı ABD endeksi</p>
                      <div className="space-y-1">
                        <Label htmlFor="nasdaqReturnRate" className="text-xs">Yıllık Getiri Oranı (%)</Label>
                        <Input
                          id="nasdaqReturnRate"
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={parameters.nasdaqReturnRate}
                          onChange={(e) => handleInputChange('nasdaqReturnRate', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-colors ${parameters.selectedIndex === 'sp500' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleInputChange('selectedIndex', 'sp500')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">S&P500</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">ABD'nin en büyük 500 şirketi</p>
                      <div className="space-y-1">
                        <Label htmlFor="sp500ReturnRate" className="text-xs">Yıllık Getiri Oranı (%)</Label>
                        <Input
                          id="sp500ReturnRate"
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={parameters.sp500ReturnRate}
                          onChange={(e) => handleInputChange('sp500ReturnRate', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="etf" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="managementFeeRate">Yönetim Ücreti (%)</Label>
                  <Input
                    id="managementFeeRate"
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={parameters.managementFeeRate}
                    onChange={(e) => handleInputChange('managementFeeRate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withholdingTaxRate">Stopaj Oranı (%)</Label>
                  <Input
                    id="withholdingTaxRate"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={parameters.withholdingTaxRate}
                    onChange={(e) => handleInputChange('withholdingTaxRate', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium">ETF Özellikleri:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Stopaj kazanç üzerinden yıllık olarak kesilir</li>
                      <li>Yönetim ücreti yıllık olarak uygulanır</li>
                      <li>Likit yatırım - istediğiniz zaman satabilirsiniz</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="governmentContributionRate">Devlet Katkısı (%)</Label>
                  <Input
                    id="governmentContributionRate"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={parameters.governmentContributionRate}
                    onChange={(e) => handleInputChange('governmentContributionRate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governmentFundReturnRate">Devlet Fonu Getiri Oranı (%)</Label>
                  <Input
                    id="governmentFundReturnRate"
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={parameters.governmentFundReturnRate}
                    onChange={(e) => handleInputChange('governmentFundReturnRate', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <PiggyBank className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium">BES Avantajları:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Aylık ödemenizin %{parameters.governmentContributionRate}'u kadar devlet katkısı</li>
                      <li>Stopaj kesintisi yoktur</li>
                      <li>Devlet katkısı enflasyon oranında değerlenir</li>
                      <li>Erken çekim durumunda cezalar uygulanır</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isCalculating} className="flex-1">
              {isCalculating ? 'Hesaplanıyor...' : 'Hesapla'}
            </Button>
            <Button type="button" variant="outline" onClick={resetToDefaults}>
              Varsayılan Değerler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

