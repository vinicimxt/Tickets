// utils/dateUtils.js
export function parseDateInfo(dateString) {
  // Exemplo de entrada: "06/09/2025 às 16:00"
  const [datePart] = dateString.split(' às ');
  const [day, month, year] = datePart.split('/').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return {
    day: String(day).padStart(2, '0'),
    month: months[month - 1],
    weekday: weekdays[dateObj.getDay()],
  };
}
