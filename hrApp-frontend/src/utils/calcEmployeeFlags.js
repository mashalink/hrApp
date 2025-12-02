export function getEmployeeFlags(startDate) {
  const years = (
    (Date.now() - new Date(startDate)) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);

  const yearsNum = parseFloat(years);

  return {
    yearsNum,
    isAnniversary: yearsNum % 5 === 0 && yearsNum >= 5,
    isProbation: yearsNum < 0.5,
  };
}
