# Ajustes de auditoría del portafolio

Aplicación de los puntos de esta solicitud, con prioridad a la corrección final sobre avisos.

## Fase 1 — precisión
1. Nota discreta única en cada dashboard, usando el texto aprobado; sin badges ni atribución de cifras a clientes.
2. Nota discreta en la suite logística y explicación única de sus elementos ilustrativos; acciones sin ejecución marcadas como deshabilitadas. La navegación conserva su funcionamiento.
3. Definiciones Warehouse comprobadas contra warehouseSummary: cajas equivalentes, peso, volumen, drop, cumplimiento y cantidades no surtidas.
4. Explicación del conteo único y la participación de un documento en varios grupos de preparadores; los conteos no son aditivos.
5. Alcance CTS visible: unidades y corporativo frente a Distribución A únicamente en canal/centro.
6. Fórmulas CTS documentadas a partir de netSales, netCost, sumCTS y scopeCTSTotal: margen, gastos con signo, CTS y contribución. Se explica la base corporativa y la reclasificación por perspectiva.

## Fase 2 — navegación
7. Preferencia ES/EN conservada en almacenamiento local, con funcionamiento alternativo mediante URL si el almacenamiento no está disponible.
8. Idioma compartible con ?lang=es o ?lang=en antes del fragmento de ruta. Prioridad: URL válida, preferencia guardada, EN.
9. Especialidades de inicio: SAP Business One (SAP B1), SQL Server/BI, SSRS y Power Apps.
10. Nombres propios de proyectos conservados entre idiomas; descripciones y términos de interfaz traducidos.
11. Navegación compacta dentro de casos extensos y acceso directo a contacto; enlaces internos no sustituyen la ruta del caso.
12. Tablas navegables por teclado y desplazamiento horizontal, encabezados y primera columna persistentes, indicación de desplazamiento sin alterar agregaciones.

## Fase 3 — terminología
13. Warehouse utiliza Unfulfilled Quantities y Unfulfilled quantity rate para cantidades no surtidas; no se equiparan faltantes con pérdidas o ajustes físicos.
14. SQL Query Access diferencia el acceso por consultas de ETL y reportería. Corporate BI reúne consumo/distribución; Enterprise Data Architecture & ETL explica diseño de capas e integración. Enlaces cruzados entre ambos.

## Verificación
- Archivos de datos y fórmulas no modificados: warehouseData.ts y ctsData.ts.
- Pruebas de cálculo y conciliación existentes conservadas.
- Pruebas adicionales de prioridad y construcción del idioma en URL.
- Navegación, recarga, enlaces compartibles, controles, definiciones y rutas revisados en ES/EN, de 300 a 1440 px.

## Pendiente de confirmación funcional
La referencia CTS no incluía los cálculos SQL externos que alimentaban ciertas tablas. No se afirma haberlos reconstruido ni validado. Las fórmulas y criterios presentes en la implementación actual sí se verificaron. No se alteraron importes, datos ni reglas para completar ese alcance ausente.
