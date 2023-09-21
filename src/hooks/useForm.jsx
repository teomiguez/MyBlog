import { useState } from "react";

export const useForm = () => {
    const [form, setForm] = useState({});
    /* 
        Serializar formulario - si el formulario tuviese 100 campos, de esta manera sería más rapido que andar 
        cargando el obj. un campo a la vez.
    */
    const serializeForm = (form) => {
        const formData = new FormData(form);
        const obj = {};

        for(let [name, value] of formData)
        {
            obj[name] = value;
        }

        return obj;
    }

    const saveForm = e => {
        // e.preventDefault();
        let objForm = serializeForm(e.target);
        setForm(objForm);
    }

    const changeState = e => {
        let target = e.target;
        if (form !== null)
        {
            const { name, value } = target;
            setForm({
                ...form,
                [name]: value
            });
        }
    }

    return {
        form: form,
        save: saveForm,
        update: changeState,
    }
}