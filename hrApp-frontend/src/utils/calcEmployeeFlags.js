export function getEmployeeFlags(startDate) {
  if (!startDate) {
    return {
      yearsWorked: 0,
      monthsWorked: 0,
      isAnniversary: false,
      isProbation: false,
    };
  }

  const start = new Date(startDate);
  const today = new Date();

  // Full years worked (calendar-based)
  const yearsDiff = today.getFullYear() - start.getFullYear();

  const hasHadAnniversaryThisYear =
    today.getMonth() > start.getMonth() ||
    (today.getMonth() === start.getMonth() &&
      today.getDate() >= start.getDate());

  const yearsWorked = hasHadAnniversaryThisYear
    ? yearsDiff
    : yearsDiff - 1;

  // Full months worked (calendar-based)
  const monthsWorked =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  const probationEnd = new Date(start);
  probationEnd.setMonth(probationEnd.getMonth() + 6);

  const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;
  // Keep probation flag through the 6-month mark.
  const isProbation = today <= probationEnd;

  return {
    yearsWorked,
    monthsWorked,
    isAnniversary,
    isProbation,
  };
}
