import Layout from "@/components/Module/Layout"
import PageHeader from "@/components/Module/PageHeader"
import AddBookForm from "@/components/AddBook/AddBookForm"

const AddBookPage = () => {
    return (
        <Layout>
            <PageHeader title="Add Book"></PageHeader>
            <AddBookForm />
        </Layout>
    )
}

export default AddBookPage;