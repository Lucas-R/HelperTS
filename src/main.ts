import useRouter from "./hook/useRouter";

function main() {
    const router = useRouter();

    router.push("/test");

    console.log(router.path)
}

main();