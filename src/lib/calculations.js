/**
 * ETF yatırımı hesaplama fonksiyonu
 * @param {Object} params - Hesaplama parametreleri
 * @param {number} params.initialMonthlyPayment - İlk aylık ödeme (TL)
 * @param {number} params.annualReturnRate - Yıllık getiri oranı (ondalık)
 * @param {number} params.managementFeeRate - Yönetim ücreti oranı (ondalık)
 * @param {number} params.withholdingTaxRate - Stopaj oranı (ondalık)
 * @param {number} params.years - Yatırım süresi (yıl)
 * @param {number} params.annualIncreaseRate - Yıllık artış oranı (ondalık)
 * @returns {Object} Hesaplama sonuçları
 */
export function calculateETFInvestment({
  initialMonthlyPayment,
  annualReturnRate,
  managementFeeRate,
  withholdingTaxRate,
  years,
  annualIncreaseRate
}) {
  let totalBalance = 0;
  let monthlyPayment = initialMonthlyPayment;
  const yearlyDetails = [];
  let totalContributions = 0;
  let totalWithholdingTax = 0;

  for (let year = 1; year <= years; year++) {
    const yearStartBalance = totalBalance;
    let yearContributions = 0;

    // Her ay için hesaplama
    for (let month = 0; month < 12; month++) {
      // Aylık katkı
      yearContributions += monthlyPayment;
      totalContributions += monthlyPayment;
      totalBalance += monthlyPayment;

      // Aylık getiri (yönetim ücreti düşülmüş)
      const netMonthlyReturn = (annualReturnRate - managementFeeRate) / 12;
      totalBalance *= (1 + netMonthlyReturn);
    }

    // Yıl sonu stopaj kesintisi (sadece kazanç üzerinden)
    const yearEndBalanceBeforeTax = totalBalance;
    const yearGain = yearEndBalanceBeforeTax - yearStartBalance - yearContributions;

    let withholdingTax = 0;
    if (yearGain > 0) {
      withholdingTax = yearGain * withholdingTaxRate;
      totalBalance -= withholdingTax;
      totalWithholdingTax += withholdingTax;
    }

    yearlyDetails.push({
      year,
      monthlyPayment,
      yearContributions,
      yearStartBalance,
      yearEndBalanceBeforeTax,
      yearGain,
      withholdingTax,
      yearEndBalance: totalBalance
    });

    // Gelecek yıl için aylık ödemeyi artır
    monthlyPayment *= (1 + annualIncreaseRate);
  }

  return {
    totalBalance,
    totalContributions,
    totalWithholdingTax,
    totalGain: totalBalance - totalContributions,
    yearlyDetails
  };
}

/**
 * BES yatırımı hesaplama fonksiyonu
 * @param {Object} params - Hesaplama parametreleri
 * @param {number} params.initialMonthlyPayment - İlk aylık ödeme (TL)
 * @param {number} params.annualReturnRate - Yıllık getiri oranı (ondalık)
 * @param {number} params.managementFeeRate - Yönetim ücreti oranı (ondalık)
 * @param {number} params.governmentContributionRate - Devlet katkısı oranı (ondalık)
 * @param {number} params.governmentFundReturnRate - Devlet fonu getiri oranı (ondalık)
 * @param {number} params.years - Yatırım süresi (yıl)
 * @param {number} params.annualIncreaseRate - Yıllık artış oranı (ondalık)
 * @returns {Object} Hesaplama sonuçları
 */
export function calculateBESInvestment({
  initialMonthlyPayment,
  annualReturnRate,
  managementFeeRate,
  governmentContributionRate,
  governmentFundReturnRate,
  years,
  annualIncreaseRate
}) {
  let personalBalance = 0; // Kişisel katkı bakiyesi
  let governmentBalance = 0; // Devlet katkısı bakiyesi
  let monthlyPayment = initialMonthlyPayment;
  const yearlyDetails = [];
  let totalPersonalContributions = 0;
  let totalGovernmentContributions = 0;

  for (let year = 1; year <= years; year++) {
    const yearStartPersonal = personalBalance;
    const yearStartGovernment = governmentBalance;
    let yearPersonalContributions = 0;
    let yearGovernmentContributions = 0;

    // Her ay için hesaplama
    for (let month = 0; month < 12; month++) {
      // Kişisel katkı
      yearPersonalContributions += monthlyPayment;
      totalPersonalContributions += monthlyPayment;
      personalBalance += monthlyPayment;

      // Devlet katkısı
      const governmentContribution = monthlyPayment * governmentContributionRate;
      yearGovernmentContributions += governmentContribution;
      totalGovernmentContributions += governmentContribution;
      governmentBalance += governmentContribution;

      // Aylık getiri hesaplamaları
      // Kişisel bakiye (yönetim ücreti düşülmüş)
      const netMonthlyReturnPersonal = (annualReturnRate - managementFeeRate) / 12;
      personalBalance *= (1 + netMonthlyReturnPersonal);

      // Devlet bakiyesi (enflasyon oranında)
      const netMonthlyReturnGovernment = (governmentFundReturnRate - managementFeeRate) / 12;
      governmentBalance *= (1 + netMonthlyReturnGovernment);
    }

    const totalBalance = personalBalance + governmentBalance;

    yearlyDetails.push({
      year,
      monthlyPayment,
      yearPersonalContributions,
      yearGovernmentContributions,
      yearStartPersonal,
      yearStartGovernment,
      yearEndPersonal: personalBalance,
      yearEndGovernment: governmentBalance,
      yearEndTotal: totalBalance
    });

    // Gelecek yıl için aylık ödemeyi artır
    monthlyPayment *= (1 + annualIncreaseRate);
  }

  return {
    totalBalance: personalBalance + governmentBalance,
    personalBalance,
    governmentBalance,
    totalPersonalContributions,
    totalGovernmentContributions,
    totalContributions: totalPersonalContributions + totalGovernmentContributions,
    totalGain: (personalBalance + governmentBalance) - (totalPersonalContributions + totalGovernmentContributions),
    yearlyDetails
  };
}

/**
 * ETF ve BES yatırımlarını karşılaştırma fonksiyonu
 * @param {Object} etfParams - ETF parametreleri
 * @param {Object} besParams - BES parametreleri
 * @returns {Object} Karşılaştırma sonuçları
 */
export function compareInvestments(etfParams, besParams) {
  const etfResults = calculateETFInvestment(etfParams);
  const besResults = calculateBESInvestment(besParams);

  const besAdvantage = besResults.totalBalance - etfResults.totalBalance;
  const besAdvantagePercentage = ((besResults.totalBalance / etfResults.totalBalance) - 1) * 100;

  return {
    etf: etfResults,
    bes: besResults,
    comparison: {
      besAdvantage,
      besAdvantagePercentage,
      totalPersonalContributions: etfResults.totalContributions,
      totalGovernmentContributions: besResults.totalGovernmentContributions,
      etfWithholdingTax: etfResults.totalWithholdingTax
    }
  };
}

/**
 * Varsayılan parametreleri döndürür
 * @returns {Object} Varsayılan parametreler
 */
export function getDefaultParameters() {
  return {
    // Ortak parametreler
    initialMonthlyPayment: 1000,
    years: 31,
    annualIncreaseRate: 0.10,
    managementFeeRate: 0.02,

    // ETF özgü parametreler
    withholdingTaxRate: 0.15,

    // BES özgü parametreler
    governmentContributionRate: 0.30,
    governmentFundReturnRate: 0.10,

    // Endeks getirileri
    nasdaqReturnRate: 0.15,
    sp500ReturnRate: 0.10
  };
}

/**
 * Sayıyı Türk Lirası formatında döndürür
 * @param {number} amount - Miktar
 * @returns {string} Formatlanmış miktar
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Yüzdeyi formatlar
 * @param {number} percentage - Yüzde değeri
 * @param {number} decimals - Ondalık basamak sayısı
 * @returns {string} Formatlanmış yüzde
 */
export function formatPercentage(percentage, decimals = 1) {
  return `%${percentage.toFixed(decimals)}`;
}

