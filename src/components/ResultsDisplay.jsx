import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/calculations';

export function ResultsDisplay({ results, parameters }) {
  if (!results) return null;

  const { etf, bes, comparison } = results;

  // Grafik verileri hazırla
  const comparisonData = [
    {
      name: 'ETF',
      value: etf.totalBalance,
      contributions: etf.totalContributions,
      gain: etf.totalGain
    },
    {
      name: 'BES',
      value: bes.totalBalance,
      contributions: bes.totalPersonalContributions,
      governmentContribution: bes.totalGovernmentContributions,
      gain: bes.totalGain
    }
  ];

  // Yıllık gelişim verileri
  const yearlyData = etf.yearlyDetails.map((etfYear, index) => ({
    year: etfYear.year,
    etf: etfYear.yearEndBalance,
    bes: bes.yearlyDetails[index]?.yearEndTotal || 0
  }));

  // Katkı dağılımı verileri
  const contributionData = [
    { name: 'Kişisel Katkı', value: comparison.totalPersonalContributions, color: '#3b82f6' },
    { name: 'Devlet Katkısı', value: comparison.totalGovernmentContributions, color: '#10b981' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  // Özel tooltip formatları
  const formatTooltip = (value, name) => {
    return [formatCurrency(value), name];
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ETF Toplam Birikim</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(etf.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Stopaj: {formatCurrency(etf.totalWithholdingTax)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BES Toplam Birikim</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(bes.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Devlet Katkısı: {formatCurrency(bes.totalGovernmentContributions)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BES Avantajı</CardTitle>
            {comparison.besAdvantage > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${comparison.besAdvantage > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(comparison.besAdvantage))}
            </div>
            <p className="text-xs text-muted-foreground">
              {comparison.besAdvantage > 0 ? '+' : ''}{formatPercentage(comparison.besAdvantagePercentage)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ana Sonuçlar */}
      <Card>
        <CardHeader>
          <CardTitle>Yatırım Karşılaştırması</CardTitle>
          <CardDescription>
            {parameters.years} yıllık yatırım süreci sonunda toplam birikim karşılaştırması
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comparison">Karşılaştırma</TabsTrigger>
              <TabsTrigger value="yearly">Yıllık Gelişim</TabsTrigger>
              <TabsTrigger value="breakdown">Detay Analiz</TabsTrigger>
              <TabsTrigger value="summary">Özet</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={formatYAxisTick} />
                  <Tooltip formatter={formatTooltip} />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Toplam Birikim" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatYAxisTick} />
                  <Tooltip formatter={formatTooltip} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="etf" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="ETF Birikimi" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bes" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="BES Birikimi" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Katkı Dağılımı (BES)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={contributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Detaylı Analiz</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">ETF Yatırımı</h4>
                      <div className="text-sm text-blue-800 space-y-1 mt-2">
                        <p>Toplam Katkı: {formatCurrency(etf.totalContributions)}</p>
                        <p>Brüt Kazanç: {formatCurrency(etf.totalGain + etf.totalWithholdingTax)}</p>
                        <p>Stopaj Kesintisi: {formatCurrency(etf.totalWithholdingTax)}</p>
                        <p>Net Kazanç: {formatCurrency(etf.totalGain)}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">BES Yatırımı</h4>
                      <div className="text-sm text-green-800 space-y-1 mt-2">
                        <p>Kişisel Katkı: {formatCurrency(bes.totalPersonalContributions)}</p>
                        <p>Devlet Katkısı: {formatCurrency(bes.totalGovernmentContributions)}</p>
                        <p>Toplam Katkı: {formatCurrency(bes.totalContributions)}</p>
                        <p>Net Kazanç: {formatCurrency(bes.totalGain)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ana Bulgular</h3>
                  
                  <div className="space-y-3">
                    {comparison.besAdvantage > 0 ? (
                      <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-900">BES Daha Avantajlı</p>
                          <p className="text-sm text-green-800">
                            BES yatırımı ETF'den {formatCurrency(comparison.besAdvantage)} 
                            ({formatPercentage(comparison.besAdvantagePercentage)}) daha fazla getiri sağlıyor.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-900">ETF Daha Avantajlı</p>
                          <p className="text-sm text-red-800">
                            ETF yatırımı BES'den {formatCurrency(Math.abs(comparison.besAdvantage))} 
                            ({formatPercentage(Math.abs(comparison.besAdvantagePercentage))}) daha fazla getiri sağlıyor.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">Devlet Katkısı Etkisi</p>
                      <p className="text-sm text-blue-800">
                        {parameters.years} yıl boyunca toplam {formatCurrency(comparison.totalGovernmentContributions)} 
                        devlet katkısı alacaksınız.
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-900">Stopaj Etkisi</p>
                      <p className="text-sm text-yellow-800">
                        ETF yatırımında toplam {formatCurrency(comparison.etfWithholdingTax)} stopaj ödemesi yapacaksınız.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Öneriler</h3>
                  
                  <div className="space-y-3">
                    {comparison.besAdvantage > 0 ? (
                      <>
                        <Badge variant="default" className="bg-green-600">
                          Önerilen: BES Yatırımı
                        </Badge>
                        <ul className="text-sm space-y-2 text-gray-700">
                          <li>• Devlet katkısı avantajından yararlanın</li>
                          <li>• Stopaj kesintisi olmayacak</li>
                          <li>• Uzun vadeli emeklilik planlaması için ideal</li>
                          <li>• Erken çekim cezalarına dikkat edin</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <Badge variant="default" className="bg-blue-600">
                          Önerilen: ETF Yatırımı
                        </Badge>
                        <ul className="text-sm space-y-2 text-gray-700">
                          <li>• Daha yüksek net getiri sağlıyor</li>
                          <li>• Likit yatırım - istediğiniz zaman satabilirsiniz</li>
                          <li>• Stopaj maliyetini göz önünde bulundurun</li>
                          <li>• Çeşitlendirme için BES'i de değerlendirin</li>
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">Hibrit Strateji</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Her iki yatırım aracını da portföyünüzde bulundurarak 
                      risk dağılımı yapabilir ve farklı avantajlardan yararlanabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

