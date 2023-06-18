import { ChangeEvent, Dispatch, SetStateAction } from "react";
import genres from "../common/utils/genres.json";

interface SelectProps {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
}

const GenreSelect = (props: SelectProps) => { 

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setValue(+e.target.value);
    }

    const genreOptions = (genres as {id: number, name: string}[]).map(genre => {
        return (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        )
    })

    return (
        <select 
            value={props.value} 
            onChange={handleSelectChange}
            className="bg-sky-50 border border-neutral-950 rounded"
        >
            { genreOptions }
        </select>
    )
}

export default GenreSelect;
