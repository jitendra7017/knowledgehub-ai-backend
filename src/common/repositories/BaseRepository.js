class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data, options = {}) {
        return this.model.create(data, options);
    }

    async bulkCreate(data, options = {}) {
        return this.model.bulkCreate(data, options);
    }

    async findById(id, options = {}) {
        return this.model.findByPk(id, options);
    }

    async findOne(where, options = {}) {
        return this.model.findOne({
            where,
            ...options
        });
    }

    async findAll(where = {}, options = {}) {
        return this.model.findAll({
            where,
            ...options
        });
    }

    async update(where, data) {
        return this.model.update(data, {
            where
        });
    }

    async delete(where) {
        return this.model.destroy({
            where
        });
    }

    async count(where = {}) {
        return this.model.count({
            where
        });
    }

    async exists(where) {
        const count = await this.model.count({
            where
        });

        return count > 0;
    }
}

export default BaseRepository;