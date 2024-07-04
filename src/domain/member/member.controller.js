import Member from "./member.schema.js";

export const checkMember = async (req, res) => {
    try {
        const members = await Member.aggregate([
            {
                $project: {
                    _id: 0,
                    code: 1,
                    name: 1,
                    borrowedBooks: {
                        $size: "$borrowedBooks",
                    },
                },
            },
        ]);
        return res.json({
            success: true,
            status: 200,
            message: "success",
            data: members,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message,
        });
    }
};
