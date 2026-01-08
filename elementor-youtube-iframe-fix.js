/*
 * Rebuild Elementor YouTube Iframes
 *
 * Este script detecta iframes de YouTube generados por Elementor y los reconstruye
 * dinámicamente para garantizar una carga correcta y consistente del reproductor.
 *
 * Su función principal es:
 * - Identificar iframes con la clase `elementor-video` cuyo origen sea YouTube.
 * - Extraer el video ID desde la URL `/embed/`.
 * - Reemplazar el iframe original por uno nuevo, limpio y controlado.
 * - Forzar parámetros compatibles (`rel=0`, `playsinline=1`) y atributos modernos
 *   de seguridad, rendimiento y privacidad.
 * - Evitar reprocesar iframes ya corregidos.
 * - Reejecutarse automáticamente cuando Elementor o el DOM inyectan nuevo contenido.
 *
 * Es útil para resolver errores de renderizado, bloqueos del reproductor,
 * inconsistencias entre entornos (staging/producción) y conflictos con
 * scripts de terceros o políticas de referrer.
 *
 * Author: Gustavo Morean – TAVO Web Designer
 * Author URI: https://tavowebdesigner.com
 * Author Email: tavowebdesigner@gmail.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

(function () {

  function rebuildElementorYouTubeIframes() {
    const iframes = document.querySelectorAll('iframe.elementor-video');

    iframes.forEach(oldIframe => {
      const src = oldIframe.getAttribute('src');
      if (!src || !/youtube\.com/.test(src)) return;

      // Evitar reprocesar
      if (oldIframe.dataset.ytFixed === '1') return;

      const match = src.match(/\/embed\/([^?&]+)/);
      if (!match) return;

      const videoId = match[1];

      const newIframe = document.createElement('iframe');
      newIframe.className = oldIframe.className;
      newIframe.width = oldIframe.width || '640';
      newIframe.height = oldIframe.height || '360';

      newIframe.src =
        'https://www.youtube.com/embed/' +
        videoId +
        '?rel=0&playsinline=1';

      newIframe.setAttribute('frameborder', '0');
      newIframe.setAttribute('allowfullscreen', '');
      newIframe.setAttribute(
        'allow',
        'autoplay; encrypted-media; picture-in-picture'
      );
      newIframe.setAttribute(
        'referrerpolicy',
        'strict-origin-when-cross-origin'
      );
      newIframe.setAttribute('loading', 'eager');

      newIframe.dataset.ytFixed = '1';

      oldIframe.replaceWith(newIframe);
    });
  }

  document.addEventListener('DOMContentLoaded', rebuildElementorYouTubeIframes);

  const observer = new MutationObserver(rebuildElementorYouTubeIframes);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
