# Elementor YouTube Iframe Fix

Script en JavaScript diseñado para corregir y normalizar los iframes de YouTube generados por Elementor en WordPress, especialmente en escenarios donde el reproductor falla, se bloquea o presenta comportamientos inconsistentes entre entornos.

## Contexto del problema

Elementor inserta iframes de YouTube que, bajo ciertas condiciones, pueden generar errores debido a:

- Políticas estrictas de `referrer`.
- Optimización agresiva de scripts o caché.
- Renderizado dinámico del DOM.
- Conflictos con otros scripts o librerías.
- Diferencias entre staging y producción.

Estos problemas suelen manifestarse como iframes que no cargan, errores de consola o reproductores inestables.

## Enfoque de la solución

El script reconstruye de forma controlada los iframes afectados, garantizando:

- URLs limpias y consistentes.
- Parámetros compatibles con el reproductor de YouTube.
- Atributos modernos de seguridad y rendimiento.
- Compatibilidad con contenido dinámico de Elementor.

No modifica el core de Elementor ni depende de librerías externas.

## Qué hace exactamente

- Escanea el DOM en busca de iframes con la clase `elementor-video`.
- Verifica que el iframe pertenezca a YouTube.
- Extrae el `videoId` desde la URL `/embed/`.
- Reemplaza el iframe original por uno nuevo, controlado.
- Aplica atributos clave:
  - `rel=0`
  - `playsinline=1`
  - `allow="autoplay; encrypted-media; picture-in-picture"`
  - `referrerpolicy="strict-origin-when-cross-origin"`
  - `loading="eager"`
- Evita reprocesar iframes ya corregidos.
- Observa cambios dinámicos en el DOM mediante `MutationObserver`.

## Instalación básica

1. Copia el archivo `elementor-youtube-iframe-fix.js` en tu proyecto.
2. Cárgalo en el frontend de WordPress.
3. No requiere configuración adicional.

## Ejemplos de integración

### Integración desde `functions.php`

`function tavo_elementor_youtube_iframe_fix() {
  wp_enqueue_script(
    'elementor-youtube-iframe-fix',
    get_stylesheet_directory_uri() . '/assets/js/elementor-youtube-iframe-fix.js',
    [],
    '1.0.0',
    true
  );
}
add_action('wp_enqueue_scripts', 'tavo_elementor_youtube_iframe_fix');`

### Integración en un plugin existente

`wp_enqueue_script(
  'elementor-youtube-iframe-fix',
  plugin_dir_url(__FILE__) . 'assets/js/elementor-youtube-iframe-fix.js',
  [],
  '1.0.0',
  true
);`

## Integración directa en el tema (no recomendada)
Solo recomendable para pruebas rápidas o entornos controlados.

`<script src="/wp-content/themes/tu-tema/assets/js/elementor-youtube-iframe-fix.js"></script>`

## Cuándo usar este script

- Videos de YouTube no cargan correctamente en Elementor.
- Errores intermitentes entre entornos.
- Uso de caché, minificadores o CDN.
- Sitios con alto contenido dinámico.
- Necesidad de mayor control sobre atributos del iframe.

## Compatibilidad

- WordPress
- Elementor (versiones modernas)
- Navegadores modernos
- Compatible con builders visuales y renderizado dinámico

## Licencia
GPL v2 o posterior
https://www.gnu.org/licenses/gpl-2.0.html

## Autor
Gustavo Morean
TAVO Web Designer
[https://tavowebdesigner.com](https://tavowebdesigner.com)
