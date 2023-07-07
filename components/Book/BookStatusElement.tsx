import { BookStatus } from "@/common/utils/enum";
import { type ColorScheme } from "@/common/utils/propsInterfaces";

const BookStatusElement = ({status}: {status: BookStatus}) => {
    const { bg, text } = statusColor(status);
    return (
        <p 
            style={{
                backgroundColor: bg,
                color: text
            }}
            className="rounded px-1 py-1"
        >
            { BookStatus[status] }
        </p>
    );
};

const statusColor = (status: BookStatus): ColorScheme => {
    switch (status) {
        case BookStatus.Available:
            return {bg: "#B3FFAE", text: "#379237"};
        case BookStatus.Borrowed:
            return {bg: "#FCAEAE", text: "#CC3636"};
        case BookStatus.LoanPending:
            return {bg: "#F3E99F", text: "#F29727"};
        case BookStatus.ReturnPending:
            return {bg: "#F3E99F", text: "#F29727"};
        default:
            return {bg: "#FFFFFF", text: "#FFFFFF"};
    };
};

export default BookStatusElement;