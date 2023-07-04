import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import UserDetails from "@/components/Profile/UserDetails";

const ProfilePage = () => {
    return (
        <Layout>
            <PageHeader title="Profile"></PageHeader>
            <UserDetails />
        </Layout>
    );
};

export default ProfilePage;