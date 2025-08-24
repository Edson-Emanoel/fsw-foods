import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
    return (
        <div className="flex gap-2">
            <Input placeholder="Buscar Restaurantes" className="border-none bg-primary-foreground" />

            <Button size="icon" className="w-10 h-10">
                <SearchIcon size={20} />
            </Button>
        </div>
    );
}
 
export default Search;