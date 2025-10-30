document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('calcularBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const diasPrestamo = Number(document.getElementById('diasPrestamo').value) || 0;
    const diasRetraso = Number(document.getElementById('diasRetraso').value) || 0;
    const multaDia = Number(document.getElementById('multaDia').value) || 0;

    const multaTotal = diasRetraso * multaDia;
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
      <p>Días de préstamo: <strong>${diasPrestamo}</strong></p>
      <p>Días de retraso: <strong>${diasRetraso}</strong></p>
      <p>Multa por día: <strong>ARS ${multaDia.toFixed(2)}</strong></p>
      <hr>
      <p class="fw-bold">Multa total estimada: ARS ${multaTotal.toFixed(2)}</p>
    `;
  });
});