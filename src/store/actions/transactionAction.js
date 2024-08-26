export function addTransaction(transaction) {
    return {
        type: "ADD_TRANSACTION",
        payload: { transaction },
    }
}