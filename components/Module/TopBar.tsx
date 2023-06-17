import Image from "next/image"

const TopBar = () => {
    return (
        <div className="flex items-center gap-5 mb-6">
            <Image src="/../public/open-book.png" alt="logo" width="70" height="70" />
            <p className="text-xl">Collabrary</p>
        </div>
    )
}

export { TopBar };