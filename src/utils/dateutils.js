// utils/dateUtils.js
export function parseDateInfo(dateString) {
  // Espera formato: "2025-09-06 16:00:00"
  const dateObj = new Date(dateString);

  if (isNaN(dateObj)) return { day: '--', month: '---', weekday: '---' };

  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return {
    day: String(dateObj.getDate()).padStart(2, '0'),
    month: months[dateObj.getMonth()],
    weekday: weekdays[dateObj.getDay()],
  };
}
