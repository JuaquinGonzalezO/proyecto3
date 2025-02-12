import User from '../users/user.model.js'
import Add_appointment from '../appointment/add_appointment.model.js'

export const saveAdd_appointment = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ''
            })
        }
        const add_appointment = new Add_appointment({
            ...data,
            keeper: user._id
        });

        await add_appointment.save();
        res.status(200).json({
            success: true,
            add_appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al hacer el appointment',
            error
        })
    }
}

export const getAdd_appointments = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const add_appointments = await Add_appointment.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const add_appointmentsWithOwnerNames = await Promise.all(add_appointments.map(async (add_appointment) => {
            const owner = await User.findById(add_appointment.keeper);
            return {
                ...add_appointment.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrado"
            }
        }));

        const total = await Add_appointment.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            pets: add_appointmentsWithOwnerNames
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener citas',
            error
        })
    }
}

export const searchAdd_appointment = async (req, res) => {
    const { id } = req.params;

    try {
        const add_appointment = await Add_appointment.findById(id);

        if (!add_appointment) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            })
        }

        const owner = await User.findById(add_appointment.keeper);

        res.status(200).json({
            success: true,
            add_appointment: {
                ...add_appointment.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrado"
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar la cita',
            error
        })
    }
}

export const deleteAdd_appointment = async (req, res) => {
    const { id } = req.params;

    try {
        await Add_appointment.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            message: 'Cita eliminada exitosamente'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la cita',
            error
        })
    }
}
