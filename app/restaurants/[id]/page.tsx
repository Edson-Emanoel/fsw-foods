interface RestaurantsPageProps {
    params: {
        id: string;
    }
}

const RestaurantsPage = ({ params }: RestaurantsPageProps) => {
    return (
        <h1>Restaurante: {params.id}</h1>
    );
}
 
export default RestaurantsPage;