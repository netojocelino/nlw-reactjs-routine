import styles from "../styles/components/Profile.module.css"

export function Profile () {
    return (
        <div className={styles.profileContainer}>
            <img
                src="https://github.com/netojocelino.png"
                alt="Neto Jocelino"
            />
            <div>
                <strong>Neto Jocelino</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Lvl 1
                </p>
            </div>
        </div>)
}
