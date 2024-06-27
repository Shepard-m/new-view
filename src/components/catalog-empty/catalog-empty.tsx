import '../catalog-empty/catalog-empty-style.css';

export default function CatalogEmpty() {
  return (
    <div className="catalog-empty" data-testid={'CatalogEmpty'}>
      <p className="catalog-empty__text">Камеры отсутствуют</p>
    </div>
  );
}
