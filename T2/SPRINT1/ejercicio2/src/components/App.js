import React from 'react';
import ListaDeFrutas from './ListaDeFrutas';

const App = () => {
  const frutas = [
    { nombre: 'Manzana', imagenUrl: 'https://w7.pngwing.com/pngs/973/255/png-transparent-red-apple-apple-fruit-apple-natural-foods-food-grocery-store-thumbnail.png' },
    { nombre: 'Banana', imagenUrl: 'https://w7.pngwing.com/pngs/955/492/png-transparent-banana-powder-fruit-cavendish-banana-banana-yellow-banana-fruit-food-image-file-formats-banana-leaves-thumbnail.png' },
    { nombre: 'Naranja', imagenUrl: 'https://w7.pngwing.com/pngs/1001/506/png-transparent-slices-of-oranges-orange-juice-flavor-fruit-nutritious-orange-natural-foods-food-orange-thumbnail.png' },
    { nombre: 'Uvas', imagenUrl: 'https://w7.pngwing.com/pngs/585/811/png-transparent-red-green-and-purple-grapes-wine-grape-fruit-food-grape-natural-foods-grape-grapevine-family-thumbnail.png' },
    { nombre: 'Pera', imagenUrl: 'https://w7.pngwing.com/pngs/712/522/png-transparent-yellow-pear-fruit-pear-pear-food-fruit-amygdaloideae-thumbnail.png' },
  ];

  return (
    <div>
      <h1>Lista de Frutas</h1>
      <ListaDeFrutas frutas={frutas} />
    </div>
  );
};

export default App;

