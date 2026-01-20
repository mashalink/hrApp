export function getEmployeeFlags(startDate) {
  if (!startDate) {
    return {
      yearsWorked: 0,
      monthsWorked: 0,
      isAnniversary: false,
      isProbation: false,
    };
  }

  const yearsWorked = Math.floor(
    (Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const monthsWorked =
    (Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24 * 30.4375);

  const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;
  const isProbation = monthsWorked < 6;

  return {
    yearsWorked,
    monthsWorked,
    isAnniversary,
    isProbation,
  };
}
