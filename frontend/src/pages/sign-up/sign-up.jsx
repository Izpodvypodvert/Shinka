import React from "react"
import { useNavigate, NavLink } from "react-router-dom"
import logoIcon from "../../images/logo.svg"

import {
    ThemeIcon,
    Paper,
    Button,
    Box,
    PasswordInput,
    Group,
    Text,
    Center,
    Space,
    TextInput,
} from "@mantine/core"

import { registerUser } from "../../utils/api"

export const SignUp = () => {
    const [userData, setUserData] = React.useState({})
    const [errorDoublePassword, setErrorDoublePassword] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")
    const [errorLogin, setErrorLogin] = React.useState("")
    const [errorPhone, setErrorPhone] = React.useState("")

    const navigate = useNavigate()

    const onChangeInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })
    }

    const checkValid = () => {
        if (!userData.username) {
            setErrorLogin("Поле с именем является обязательным")
            return false
        }
        if (userData.password.length < 7) {
            setErrorPassword("Пароль должен содержать минимум 8 символов")
            return false
        }
        if (!userData.password2) {
            setErrorDoublePassword("Поле с паролем является обязательным")
            return false
        }
        if (userData.password !== userData.password2) {
            setErrorDoublePassword("Пароли не совпадают!")
            return false
        }
        if (!/^(\+7|7|8)[0-9]{10}$/.test(userData.phone)) {
            setErrorPhone("Неправильно указан номер телефона!")
            return false
        }

        return true
    }

    const handleSubmit = () => {
        errorDoublePassword && setErrorDoublePassword("")
        errorLogin && setErrorLogin("")
        errorPassword && setErrorPassword("")
        errorPhone && setErrorPhone("")

        checkValid() &&
            registerUser(
                userData.username,
                userData.password,
                userData.email,
                userData.phone.length == 12
                    ? userData.phone
                    : userData.phone.replace(userData.phone[0], "+7"),
                userData.car_brand,
                userData.car_model
            )
                .then((res) => {
                    if (res && res.username) {
                        navigate("/signin")
                    }
                })
                .catch((err) => {
                    if (typeof err.username === "object") {
                        setErrorLogin(
                            "Пользователь с таким именем уже зарегистрирован"
                        )
                    } else if (typeof err.password === "object") {
                        setErrorPassword(
                            "Пароль должен содержать минимум 8 символов и не состоять полностью из цифр"
                        )
                    } else {
                        setErrorDoublePassword("Ошибка сервера")
                    }
                })
    }

    return (
        <Box maw={340} mx="auto">
            <Paper shadow="md" radius="lg" p="xl" withBorder>
                <Center h={150}>
                    <ThemeIcon color="white" size={90}>
                        <img
                            src={logoIcon}
                            alt="Логотип."
                            width={90}
                            height={90}
                        />
                    </ThemeIcon>
                </Center>
                <Text color="dimmed">
                    Зарегистрируйтесь для получения доступа к записи на
                    шиномонтаж!
                </Text>

                <TextInput
                    mt="sm"
                    label="Имя пользователя:"
                    placeholder="Имя пользователя"
                    onChange={onChangeInput}
                    name="username"
                    error={errorLogin}
                />

                <PasswordInput
                    label="Пароль:"
                    placeholder="Пароль"
                    onChange={onChangeInput}
                    name="password"
                    error={errorPassword}
                />
                <PasswordInput
                    label="Повторите пароль:"
                    placeholder="Повторите пароль"
                    onChange={onChangeInput}
                    name="password2"
                    error={errorDoublePassword}
                />
                <TextInput
                    label="Номер телефона:"
                    placeholder="Номер телефона"
                    onChange={onChangeInput}
                    name="phone"
                    error={errorPhone}
                />
                <TextInput
                    label="Электронная почта:"
                    placeholder="Электронная почта"
                    onChange={onChangeInput}
                    name={"email"}
                />
                <TextInput
                    label="Марка авто:"
                    placeholder="Марка авто"
                    onChange={onChangeInput}
                    name={"car_brand"}
                />
                <TextInput
                    label="Модель авто:"
                    placeholder="Модель авто"
                    onChange={onChangeInput}
                    name={"car_model"}
                />
                <Group position="right" mt="md">
                    <Button onClick={handleSubmit}>Зарегистрироваться</Button>
                </Group>

                <Space h={30} />
                <Text color="dimmed">или</Text>
                <NavLink to="/signin">Уже зарегистрированы? Войти</NavLink>
            </Paper>
        </Box>
    )
}
