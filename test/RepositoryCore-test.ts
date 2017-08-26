// MIT © 2017 azu
import { Entity } from "../src/Entity";
import { Identifier } from "../src/Identifier";
import { RepositoryCore } from "../src/RepositoryCore";
import * as assert from "assert";

class AIdentifier extends Identifier<string> {}

class AEntity extends Entity<AIdentifier> {}

describe("RepositoryCore", () => {
    describe("getLastSave", () => {
        it("should return lastSaved entity", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            assert.strictEqual(repository.getLastSaved(), undefined, "return null by default");
            // save entity
            const entity = new AEntity(new AIdentifier("a"));
            repository.save(entity);
            assert.strictEqual(repository.getLastSaved(), entity, "return entity that is saved at last");
            // delete
            repository.delete(entity);
            assert.strictEqual(repository.getLastSaved(), undefined, "return null again");
        });
    });
    describe("findById", () => {
        it("should return entity", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            const entity = new AEntity(new AIdentifier("a"));
            repository.save(entity);
            // hit same id
            assert.strictEqual(repository.findById(entity.id), entity);
        });
        it("when not found, should return undefined", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            const entity = new AEntity(new AIdentifier("a"));
            // hit same id
            assert.strictEqual(repository.findById(entity.id), undefined);
        });
    });
    describe("getAll", () => {
        it("should return all entity", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            const entity = new AEntity(new AIdentifier("a"));
            repository.save(entity);
            assert.deepStrictEqual(repository.getAll(), [entity]);
        });
    });
    describe("delete", () => {
        it("delete entity, it to be not found", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            const entity = new AEntity(new AIdentifier("a"));
            repository.save(entity);
            // delete
            repository.delete(entity);
            // not found
            assert.strictEqual(repository.findById(entity.id), undefined);
        });
    });
    describe("deleteById", () => {
        it("should delete by id", () => {
            it("delete entity, it to be not found", () => {
                const repository = new RepositoryCore<AIdentifier, AEntity>();
                const entity = new AEntity(new AIdentifier("a"));
                repository.save(entity);
                // delete
                repository.deleteById(entity.id);
                // not found
                assert.strictEqual(repository.findById(entity.id), undefined);
            });
        });
    });
    describe("clear", () => {
        it("should clear all entity", () => {
            const repository = new RepositoryCore<AIdentifier, AEntity>();
            const entity = new AEntity(new AIdentifier("a"));
            repository.save(entity);
            repository.save(entity);
            repository.save(entity);
            assert.ok(repository.getAll().length > 0);
            repository.clear();
            assert.ok(repository.getAll().length === 0, "should be cleared");
        });
    });
});