export const delivery_options = [
    {
        id: "1",
        delivery_days: 7,
        priceCent: 0,
    },
    {
        id: "2",
        delivery_days: 3,
        priceCent: 499,
    },
    {
        id: "3",
        delivery_days: 1,
        priceCent: 999,
    }
];

export function find_delivery_option_by_id(option_id){
    for (let option of delivery_options){
        if (option.id === option_id) return option;
    }
}