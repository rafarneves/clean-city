import DonationPage from '@/components/Page/DonationPage';

export default async function PageDoacao({ params }: { params: Promise<{ id: string }> }) {
    const slug = (await params).id;
    return (
        <DonationPage actionId={parseInt(slug)} />
    )
}