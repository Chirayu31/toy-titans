function CurrencyFormatter(props) {
    const { amount, currency } = props;

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    });

    return <span>{formatter.format(amount)}</span>;
}

export default CurrencyFormatter;
