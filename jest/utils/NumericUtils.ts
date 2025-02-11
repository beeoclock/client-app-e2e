export class NumericUtils {

    /**
     * Generate random ObjectId
     * NumericUtils.generateObjectId()
     * @returns {string} - random ObjectId  662a4637a4b376d20c065b1d
     */

    public static generateObjectId(): string {
        return [...Array(24)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("");
    }
}