import { type UserData } from "@/common/utils/types";
import { type ModalProps } from "@/common/utils/propsInterfaces";
import { Fragment } from "react";

interface ProfileDropdownProps extends ModalProps {
    userData: UserData
};

const ProfileDropdown = (props: ProfileDropdownProps) => {

    return (
        <Fragment>
            { props.isOpen && 
                <table className="absolute right-0 bg-blue-200 rounded-md text-left">
                    <tbody>
                        <ProfileField field="Address" value={props.userData.user[0]} />
                        <ProfileField field="Username" value={props.userData.user[1]} />
                        <ProfileField field="First Name" value={props.userData.user[2]} />
                        <ProfileField field="Last Name" value={props.userData.user[3]} />
                        <ProfileField field="Email" value={props.userData.user[4]} />
                    </tbody>
                </table>
            }
        </Fragment>
    );
};

const ProfileField = ({field, value}: {field: string, value: string}) => {
    return (
        <tr className="text-sm">
            <th>{field}</th>
            <td>{value}</td>
        </tr>
    );
};

export default ProfileDropdown;