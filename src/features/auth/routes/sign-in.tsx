import { ReactElement, useState } from "react";
import { Button, Input, Logo } from "~/components";
import { useFormik } from "formik";
import { auth } from "~/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function SignInRoute(): ReactElement {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const form = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				const response = await signInWithEmailAndPassword(auth, values.email, values.password);
				console.log(response);
			} catch (error) {
				const firebaseError = error as FirebaseError;
				setErrorMessage(t(`firebaseErrors.${firebaseError.code}`));
			}
		},
	});

	return (
		<div className="bg-gray-1 h-[100dvh] flex items-center justify-center flex-col space-y-8">
			<Logo />
			{errorMessage && <p className="text-gray-12">{errorMessage}</p>}
			<form className="flex flex-col mt-8 space-y-4" onSubmit={form.handleSubmit} onBlur={form.handleBlur}>
				<Input placeholder={t("auth.forms.emailPlaceholder")} type="email" {...form.getFieldProps("email")} />
				<Input
					placeholder={t("auth.forms.passwordPlaceholder")}
					type="password"
					{...form.getFieldProps("password")}
				/>
				<Button type="submit">{t("auth.signIn")}</Button>
			</form>
			<Link className="text-violet-10" to="/sign-up">
				{t("auth.linkToSignUp")}
			</Link>
		</div>
	);
}
