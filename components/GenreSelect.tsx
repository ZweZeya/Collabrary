import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";
import genres from "../common/utils/genres.json";

interface SelectProps {
    value: number,
    onChange: ChangeEventHandler,
    allOption?: boolean,
    name?: string,
    className?: string
}

const GenreSelect = (props: SelectProps) => { 

    const genreList = props.allOption ? genres : genres.filter(g => g.id != 0);

    const genreOptions = genreList.map(genre => {
        return (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        )
    })

    return (
        <select 
            value={props.value} 
            onChange={props.onChange}
            name={props.name}
            className={`${props.className} bg-sky-50 border border-neutral-950 rounded`}
        >
            {!props.allOption &&
                <option hidden>Select Genre</option>
            }
            { genreOptions }
        </select>
    )
}

export default GenreSelect;
