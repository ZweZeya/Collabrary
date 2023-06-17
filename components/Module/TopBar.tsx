import Logo from "./Logo";

const TopBar = () => {
    return (
        <div className="flex items-center gap-2 bg-blue-600 text-sky-50 py-3 px-3">
            <Logo />
            <p className="text-xl">Collabrary</p>
        </div>
    )
}

export default TopBar;