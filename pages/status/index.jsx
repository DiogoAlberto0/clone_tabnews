import useSWR from "swr";

const fetcher = (url) => fetch(url).then((resp) => resp.json());

export default function StatusPage() {
    const { data, isLoading, error } = useSWR("/api/v1/status", fetcher);
    if (error) console.error(error);

    return (
        <div>
            {isLoading ? (
                <h1>Carregando</h1>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}
