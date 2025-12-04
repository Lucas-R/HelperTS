export default function useStorage() {
    const get = (key: string) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn(`Erro ao ler localStorage para a chave "${key}":`, error);
            return null;
        }
    }

    const set = (key: string, value: Object): boolean => {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
            return true;
        } catch (error) {
            console.warn(`Erro ao salvar no localStorage para a chave "${key}":`, error);
            return false;
        }
    }

    return { get, set };
}