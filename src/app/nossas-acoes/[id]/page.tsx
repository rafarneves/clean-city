import api from "../../../../services/api";
import { redirect } from "next/navigation";
import ActionPage from "@/components/Page/ActionPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const slug = (await params).id;

    try {
        const response = await api.get(`/actions/${slug}`);

        if (response.status === 200) {
            return <ActionPage action={response.data} />
        } else {
            redirect('/nossas-acoes')
        }
    } catch (error: any) {
        redirect('/nossas-acoes')
    }
}