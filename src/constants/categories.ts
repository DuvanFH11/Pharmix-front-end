//Pendiente para integrar en la base de datos;
interface CategoriesInterface {
    id: number;
    name: string;
    path: string;
}
let id: number = 0;
export const categories: CategoriesInterface[] = [
    {
        id: id++,
        name: 'Usuarios',
        path: 'users',
    },
    {
        id: id++,
        name: 'Productos',
        path: 'products',
    },
    {
        id: id++,
        name: 'Pedidos',
        path: 'orders'
    },
    {
        id: id++,
        name: 'Roles',
        path: 'roles',
    },
    {
        id: id++,
        name: 'Cargos',
        path: 'appointment'
    },
    {
        id: id++,
        name: 'Facturas',
        path: 'factures',
    },
    {
        id: id++,
        name: 'Clientes',
        path: 'clients'
    },
    {
        id: id++,
        name: 'Proveedores',
        path: 'providers'
    }
];